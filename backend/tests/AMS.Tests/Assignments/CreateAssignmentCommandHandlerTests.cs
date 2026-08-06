using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Assignments.Commands.CreateAssignment;
using AMS.Domain.Entities;
using AMS.Domain.Enums;
using AMS.Infrastructure.Persistence.Context;
using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace AMS.Tests.Assignments;

public class CreateAssignmentCommandHandlerTests
{
    private readonly ApplicationDbContext _context;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ICurrentUserService> _currentUserMock;

    private readonly CreateAssignmentCommandHandler _handler;

    public CreateAssignmentCommandHandlerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);

        _mapperMock = new Mock<IMapper>();
        _currentUserMock = new Mock<ICurrentUserService>();

        _handler = new CreateAssignmentCommandHandler(
            _context,
            _mapperMock.Object,
            _currentUserMock.Object);
    }
    
    [Fact]
    public async Task Should_Create_Assignment_When_Request_Is_Valid()
    {
        // Arrange

        var teacherId = Guid.NewGuid();
        var classId = Guid.NewGuid();
        var subjectId = Guid.NewGuid();

        _currentUserMock
            .Setup(x => x.UserId)
            .Returns(teacherId);

        _context.TeacherSubjects.Add(new TeacherSubject
        {
            TeacherId = teacherId,
            ClassId = classId,
            SubjectId = subjectId
        });

        await _context.SaveChangesAsync();

        var request = new CreateAssignmentRequest
        {
            Title = "Unit Testing Assignment",
            Description = "Week 1",
            Deadline = DateTime.UtcNow.AddDays(7),
            MaximumMarks = 100,
            ClassId = classId,
            SubjectId = subjectId
        };

        var command = new CreateAssignmentCommand(request);

        var assignment = new Assignment
        {
            Title = request.Title,
            Description = request.Description,
            Deadline = request.Deadline,
            MaximumMarks = request.MaximumMarks,
            ClassId = classId,
            SubjectId = subjectId
        };

        _mapperMock
            .Setup(x => x.Map<Assignment>(request))
            .Returns(assignment);

        // Act

        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert

        result.Should().NotBeNull();

        result.Message.Should().Be("Assignment created successfully.");

        _context.Assignments.Should().HaveCount(1);

        var savedAssignment = _context.Assignments.First();

        savedAssignment.Title.Should().Be(request.Title);

        savedAssignment.TeacherId.Should().Be(teacherId);

        savedAssignment.Status.Should().Be(AssignmentStatus.Draft);

        _mapperMock.Verify(
            x => x.Map<Assignment>(request),
            Times.Once());
    }
    
    [Fact]
    public async Task Should_Throw_ForbiddenException_When_Teacher_Is_Not_Assigned()
    {
        // Arrange

        var teacherId = Guid.NewGuid();
        var classId = Guid.NewGuid();
        var subjectId = Guid.NewGuid();

        _currentUserMock
            .Setup(x => x.UserId)
            .Returns(teacherId);

        // Notice:
        // TeacherSubjects table-এ কিছু add করছি না

        var request = new CreateAssignmentRequest
        {
            Title = "Unit Testing",
            Description = "Week 1",
            Deadline = DateTime.UtcNow.AddDays(7),
            MaximumMarks = 100,
            ClassId = classId,
            SubjectId = subjectId
        };

        var command = new CreateAssignmentCommand(request);

        // Act

        Func<Task> act = () =>
            _handler.Handle(command, CancellationToken.None);

        // Assert

        await act.Should()
            .ThrowAsync<ForbiddenException>()
            .WithMessage("You are not assigned to this class and subject.");

        _mapperMock.Verify(
            x => x.Map<Assignment>(It.IsAny<CreateAssignmentRequest>()),
            Times.Never());

        _context.Assignments.Should().BeEmpty();
    }
    
    [Fact]
    public async Task Should_Save_Assignment_When_Request_Is_Valid()
    {
        // Arrange

        var teacherId = Guid.NewGuid();
        var classId = Guid.NewGuid();
        var subjectId = Guid.NewGuid();

        _currentUserMock
            .Setup(x => x.UserId)
            .Returns(teacherId);

        _context.TeacherSubjects.Add(new TeacherSubject
        {
            TeacherId = teacherId,
            ClassId = classId,
            SubjectId = subjectId
        });

        await _context.SaveChangesAsync();

        var request = new CreateAssignmentRequest
        {
            Title = "Mid Assignment",
            Description = "Unit Testing Practice",
            Deadline = DateTime.UtcNow.AddDays(7),
            MaximumMarks = 100,
            ClassId = classId,
            SubjectId = subjectId
        };

        var command = new CreateAssignmentCommand(request);

        var assignment = new Assignment
        {
            Title = request.Title,
            Description = request.Description,
            Deadline = request.Deadline,
            MaximumMarks = request.MaximumMarks,
            ClassId = classId,
            SubjectId = subjectId
        };

        _mapperMock
            .Setup(x => x.Map<Assignment>(request))
            .Returns(assignment);

        // Act

        await _handler.Handle(command, CancellationToken.None);

        // Assert

        _context.Assignments.Should().HaveCount(1);

        var savedAssignment = await _context.Assignments.FirstAsync();

        savedAssignment.Title.Should().Be(request.Title);
        savedAssignment.Description.Should().Be(request.Description);
        savedAssignment.MaximumMarks.Should().Be(request.MaximumMarks);

        savedAssignment.TeacherId.Should().Be(teacherId);

        savedAssignment.ClassId.Should().Be(classId);

        savedAssignment.SubjectId.Should().Be(subjectId);

        savedAssignment.Status.Should().Be(AssignmentStatus.Draft);

        savedAssignment.CreatedAt.Should().BeCloseTo(
            DateTime.UtcNow,
            TimeSpan.FromSeconds(5));
    }
}