using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Submissions.Commands.CreateSubmission;
using AMS.Domain.Entities;
using AMS.Domain.Enums;
using AMS.Infrastructure.Persistence.Context;
using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace AMS.Tests.Submissions;

public class CreateSubmissionsHandlerTests
{
    private readonly ApplicationDbContext _context;
    private readonly Mock<IMapper> _mapperMock;
    private readonly Mock<ICurrentUserService> _currentUserMock;
    private readonly CreateSubmissionCommandHandler _handler;

    public CreateSubmissionsHandlerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);

        _mapperMock = new Mock<IMapper>();
        _currentUserMock = new Mock<ICurrentUserService>();
        _handler = new CreateSubmissionCommandHandler(
            _context,
            _currentUserMock.Object,
            _mapperMock.Object);
        
    }
    
    [Fact]
    public async Task Should_Create_Submission_When_Request_Is_Valid()
    {
        // Arrange

        var assignmentId = Guid.NewGuid();
        var studentId = Guid.NewGuid();
        var classId = Guid.NewGuid();

        _currentUserMock
            .Setup(x => x.UserId)
            .Returns(studentId);

        var assignment = new Assignment
        {
            Id = assignmentId,
            Title = "Unit Test",
            ClassId = classId,
            Deadline = DateTime.UtcNow.AddDays(2),
            Status = AssignmentStatus.Published
        };

        _context.Assignments.Add(assignment);

        _context.StudentClasses.Add(new StudentClass
        {
            StudentId = studentId,
            ClassId = classId
        });

        await _context.SaveChangesAsync();

        var request = new CreateSubmissionRequest
        {
            AssignmentId = assignmentId,
            Answer = "My Answer"
        };

        var command = new CreateSubmissionCommand(request);

        var submission = new Submission
        {
            AssignmentId = assignmentId,
            Answer = request.Answer
        };

        _mapperMock
            .Setup(x => x.Map<Submission>(request))
            .Returns(submission);

        // Act

        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert

        result.Should().NotBeNull();

        result.Message.Should().Be("Assignment submitted successfully.");

        _context.Submissions.Should().HaveCount(1);

        var savedSubmission = await _context.Submissions.FirstAsync();

        savedSubmission.StudentId.Should().Be(studentId);

        savedSubmission.Status.Should().Be(SubmissionStatus.Submitted);
    }
    
    [Fact]
    public async Task Should_Throw_BadRequestException_When_Assignment_Is_Already_Submitted()
    {
        // Arrange

        var assignmentId = Guid.NewGuid();
        var studentId = Guid.NewGuid();
        var classId = Guid.NewGuid();

        _currentUserMock
            .Setup(x => x.UserId)
            .Returns(studentId);

        _context.Assignments.Add(new Assignment
        {
            Id = assignmentId,
            Title = "Assignment",
            ClassId = classId,
            Deadline = DateTime.UtcNow.AddDays(2),
            Status = AssignmentStatus.Published
        });

        _context.StudentClasses.Add(new StudentClass
        {
            StudentId = studentId,
            ClassId = classId
        });

        _context.Submissions.Add(new Submission
        {
            AssignmentId = assignmentId,
            StudentId = studentId,
            Answer = "Old Submission"
        });

        await _context.SaveChangesAsync();

        var request = new CreateSubmissionRequest
        {
            AssignmentId = assignmentId,
            Answer = "New Answer"
        };

        var command = new CreateSubmissionCommand(request);

        // Act

        Func<Task> act = () =>
            _handler.Handle(command, CancellationToken.None);

        // Assert

        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("You have already submitted this assignment");

        _context.Submissions.Should().HaveCount(1);

        _mapperMock.Verify(
            x => x.Map<Submission>(It.IsAny<CreateSubmissionRequest>()),
            Times.Never());
    }
}