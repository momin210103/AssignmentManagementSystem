using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Students.Commands.UpdateStudent;
using AMS.Domain.Entities;
using AMS.Infrastructure.Persistence.Context;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace AMS.Tests.Students;

public class UpdateStudentCommandHandlerTests
{
    private readonly ApplicationDbContext _context;
    private readonly Mock<IIdentityService> _identityMock;
    private readonly UpdateStudentCommandHandler _handler;

    public UpdateStudentCommandHandlerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);

        _identityMock = new Mock<IIdentityService>();

        _handler = new UpdateStudentCommandHandler(
            _identityMock.Object,
            _context);
    }

    [Fact]
    public async Task Should_Update_Student_When_Request_Is_Valid()
    {
        // Arrange

        var oldClassId = Guid.NewGuid();
        var newClassId = Guid.NewGuid();
        var studentId = Guid.NewGuid();

        _context.ClassRooms.AddRange(
            new ClassRoom
            {
                Id = oldClassId,
                Name = "Class 10"
            },
            new ClassRoom
            {
                Id = newClassId,
                Name = "Class 11"
            });

        _context.StudentClasses.Add(new StudentClass
        {
            StudentId = studentId,
            ClassId = oldClassId
        });

        await _context.SaveChangesAsync();

        var request = new UpdateStudentRequest
        {
            FullName = "Abdul Momin",
            Email = "momin@gmail.com",
            ClassId = newClassId
        };

        var command = new UpdateStudentCommand(studentId, request);

        _identityMock
            .Setup(x => x.UpdateStudentAsync(
                It.IsAny<Guid>(),
                It.IsAny<string>(),
                It.IsAny<string>()))
            .Returns(Task.CompletedTask);

        // Act

        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert

        result.Should().NotBeNull();
        result.StudentId.Should().Be(studentId);
        result.Message.Should().Be("Student updated successfully.");

        var studentClass = await _context.StudentClasses
            .FirstAsync(x => x.StudentId == studentId);

        studentClass.ClassId.Should().Be(newClassId);

        _identityMock.Verify(
            x => x.UpdateStudentAsync(
                studentId,
                request.FullName,
                request.Email),
            Times.Once());
    }
    
    [Fact]
    public async Task Should_Throw_NotFoundException_When_Student_Does_Not_Exist()
    {
        // Arrange

        var classId = Guid.NewGuid();

        _context.ClassRooms.Add(new ClassRoom
        {
            Id = classId,
            Name = "Class 10"
        });

        await _context.SaveChangesAsync();

        var request = new UpdateStudentRequest
        {
            FullName = "Abdul Momin",
            Email = "momin@gmail.com",
            ClassId = classId
        };

        var command = new UpdateStudentCommand(Guid.NewGuid(), request);

        // Act

        Func<Task> act = () =>
            _handler.Handle(command, CancellationToken.None);

        // Assert

        await act.Should()
            .ThrowAsync<NotFoundException>()
            .WithMessage("Student not found.");

        _identityMock.Verify(
            x => x.UpdateStudentAsync(
                It.IsAny<Guid>(),
                It.IsAny<string>(),
                It.IsAny<string>()),
            Times.Never());
    }
    
    [Fact]
    public async Task Should_Throw_NotFoundException_When_Class_Does_Not_Exist()
    {
        // Arrange

        var studentId = Guid.NewGuid();
        var existingClassId = Guid.NewGuid();
        var nonExistingClassId = Guid.NewGuid();

        // Existing Class
        _context.ClassRooms.Add(new ClassRoom
        {
            Id = existingClassId,
            Name = "Class 10"
        });

        // Existing Student
        _context.StudentClasses.Add(new StudentClass
        {
            StudentId = studentId,
            ClassId = existingClassId
        });

        await _context.SaveChangesAsync();

        // Update Request (Non Existing Class)
        var request = new UpdateStudentRequest
        {
            FullName = "Abdul Momin",
            Email = "momin@gmail.com",
            ClassId = nonExistingClassId
        };

        var command = new UpdateStudentCommand(studentId, request);

        // Act

        Func<Task> act = () =>
            _handler.Handle(command, CancellationToken.None);

        // Assert

        await act.Should()
            .ThrowAsync<NotFoundException>()
            .WithMessage("Class not found.");

        _identityMock.Verify(
            x => x.UpdateStudentAsync(
                It.IsAny<Guid>(),
                It.IsAny<string>(),
                It.IsAny<string>()),
            Times.Never());

        var studentClass = await _context.StudentClasses
            .FirstAsync(x => x.StudentId == studentId);

        studentClass.ClassId.Should().Be(existingClassId);
    }
    
    [Fact]
    public async Task Should_Update_StudentClass_When_Request_Is_Valid()
    {
        // Arrange

        var studentId = Guid.NewGuid();
        var oldClassId = Guid.NewGuid();
        var newClassId = Guid.NewGuid();

        _context.ClassRooms.AddRange(
            new ClassRoom
            {
                Id = oldClassId,
                Name = "Class 10"
            },
            new ClassRoom
            {
                Id = newClassId,
                Name = "Class 11"
            });

        _context.StudentClasses.Add(new StudentClass
        {
            StudentId = studentId,
            ClassId = oldClassId
        });

        await _context.SaveChangesAsync();

        var request = new UpdateStudentRequest
        {
            FullName = "Abdul Momin",
            Email = "momin@gmail.com",
            ClassId = newClassId
        };

        var command = new UpdateStudentCommand(studentId, request);

        _identityMock
            .Setup(x => x.UpdateStudentAsync(
                It.IsAny<Guid>(),
                It.IsAny<string>(),
                It.IsAny<string>()))
            .Returns(Task.CompletedTask);

        // Act

        await _handler.Handle(command, CancellationToken.None);

        // Assert

        var updatedStudent = await _context.StudentClasses
            .FirstAsync(x => x.StudentId == studentId);

        updatedStudent.ClassId.Should().Be(newClassId);

        _context.StudentClasses.Should().HaveCount(1);

        _identityMock.Verify(
            x => x.UpdateStudentAsync(
                studentId,
                request.FullName,
                request.Email),
            Times.Once());
    }
}