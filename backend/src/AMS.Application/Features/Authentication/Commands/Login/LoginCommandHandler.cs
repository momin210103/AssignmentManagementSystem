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
        var token = await _identityService.LoginAsync(
            request.Request.Email,
            request.Request.Password);

        if (token is null)
        {
            throw new Exception("Invalid email or password.");
        }

        return new LoginResponse
        {
            Token = token
        };
    }
}