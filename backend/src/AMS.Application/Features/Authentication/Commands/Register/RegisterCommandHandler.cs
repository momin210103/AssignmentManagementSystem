using AMS.Application.Common.Interfaces;
using MediatR;

namespace AMS.Application.Features.Authentication.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, RegisterResponse>
{
    private readonly IIdentityService _identityService;

    public RegisterCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public async Task<RegisterResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var result = await _identityService.RegisterAsync(
            request.Request.FullName,
            request.Request.Email,
            request.Request.Password);

        if (!result.Succeeded)
        {
            throw new Exception(string.Join(Environment.NewLine, result.Errors));
        }

        var loginResult = await _identityService.LoginAsync(
    request.Request.Email,
    request.Request.Password);

        if (loginResult is null)
        {
            throw new Exception("User registered successfully but automatic login failed.");
        }

        return new RegisterResponse
        {
            Email = request.Request.Email,
            Token = loginResult.Token,
            UserId = result.UserId!.Value,
        };
    }
}