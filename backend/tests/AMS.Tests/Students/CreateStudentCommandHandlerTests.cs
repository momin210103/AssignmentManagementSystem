using System.Net.Security;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Students.Commands.CreateStudent;
using AMS.Domain.Entities;
using AMS.Infrastructure.Persistence.Context;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace AMS.Tests.Students;

public class CreateStudentCommandHandlerTests
{
    private readonly ApplicationDbContext _context;
    private readonly Mock<IIdentityService> _identityMock;

    private readonly CreateStudentCommandHandler _handler;

    public CreateStudentCommandHandlerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new ApplicationDbContext(options);

        _identityMock = new Mock<IIdentityService>();

        _handler = new CreateStudentCommandHandler(
            _context,
            _identityMock.Object);
    }

    [Fact]
    public async Task Should_Create_Student_When_Request_Is_Valid()
    {
        // Arrange
        var classId = Guid.NewGuid();

        _context.ClassRooms.Add(new ClassRoom
        {
            Id = classId,
            Name = "Class 10"
        });

        await _context.SaveChangesAsync();
        
        var request = new CreateStudentRequest
        {
            FullName = "John Doe",
            Email = "momin@gmail.com",
            Password = "Password@123",
            ClassId = classId
        };
        var command = new CreateStudentCommand(request);
        var studentId = Guid.NewGuid();

        var identityResult = (
            Succeeded: true,
            UserId: (Guid?)studentId,
            Errors: Enumerable.Empty<string>()
        );
        _identityMock.Setup(
            x => x.CreateStudentAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>()))
            .ReturnsAsync(identityResult);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.StudentId.Should().Be(studentId);
        
        _identityMock.Verify(
            x => x.CreateStudentAsync(
                request.FullName,
                request.Email,
                request.Password),
            Times.Once);

    }
    
}