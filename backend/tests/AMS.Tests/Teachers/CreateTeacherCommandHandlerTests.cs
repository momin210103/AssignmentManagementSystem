using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;
using FluentAssertions;
using Moq;

namespace AMS.Tests.Teachers;

public class CreateTeacherCommandHandlerTests
{
    private readonly Mock<IIdentityService> _identityMock;
    private readonly CreateTeacherCommandHandler _handler;

    public CreateTeacherCommandHandlerTests()
    {
        _identityMock = new Mock<IIdentityService>();

        _handler = new CreateTeacherCommandHandler(
            _identityMock.Object);
    }

    [Fact]
    public async Task Should_Create_Teacher_When_Request_Is_Valid()
    {
        // Arrange

        var request = new CreateTeacherRequest
        {
            FullName = "John Doe",
            Email = "john@gmail.com",
            Password = "Password@123"
        };

        var command = new CreateTeacherCommand(request);

        var teacherId = Guid.NewGuid();

        var identityResult = (
            Succeeded: true,
            UserId: (Guid?)teacherId,
            Errors: Enumerable.Empty<string>()
        );

        _identityMock
            .Setup(x => x.CreateTeacherAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>()))
            .ReturnsAsync(identityResult);

        // Act

        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert

        result.Should().NotBeNull();

        result.TeacherId.Should().Be(teacherId);

        result.Message.Should().Be("Teacher created successfully.");

        _identityMock.Verify(
            x => x.CreateTeacherAsync(
                request.FullName,
                request.Email,
                request.Password),
            Times.Once());
    }
    
    [Fact]
    public async Task Should_Throw_BadRequestException_When_Identity_Creation_Fails()
    {
        // Arrange

        var request = new CreateTeacherRequest
        {
            FullName = "John Doe",
            Email = "john@gmail.com",
            Password = "Password@123"
        };

        var command = new CreateTeacherCommand(request);

        var identityResult = (
            Succeeded: false,
            UserId: (Guid?)null,
            Errors: new[] { "Teacher creation failed" }
        );

        _identityMock
            .Setup(x => x.CreateTeacherAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>()))
            .ReturnsAsync(identityResult);

        // Act

        Func<Task> act = () =>
            _handler.Handle(command, CancellationToken.None);

        // Assert

        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("Teacher creation failed");

        _identityMock.Verify(
            x => x.CreateTeacherAsync(
                request.FullName,
                request.Email,
                request.Password),
            Times.Once());
    }
}