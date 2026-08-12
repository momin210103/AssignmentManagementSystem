using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;

namespace AMS.Application.Features.Authentication.Commands.Login;

public sealed class LoginCommandHandler
    : IRequestHandler<LoginCommand, LoginResponse>
{
    private readonly IIdentityService _identityService;

    public LoginCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<LoginResponse> Handle(
        LoginCommand request,
        CancellationToken cancellationToken)
    {
        var result = await _identityService.LoginAsync(
            request.Request.Email,
            request.Request.Password);

        if (result is null)
        {
            throw new BadRequestException("Invalid email or password.");
        }

        return new LoginResponse
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            FullName = result.FullName,
            Email = result.Email,
            Role = result.Role
        };
    }
}