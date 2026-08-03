using MediatR;

namespace AMS.Application.Features.Authentication.Commands.Login;

public sealed record LoginCommand(
    LoginRequest Request
) : IRequest<LoginResponse>;