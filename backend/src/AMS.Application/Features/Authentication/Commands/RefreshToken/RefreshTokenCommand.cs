using MediatR;

namespace AMS.Application.Features.Authentication.Commands.RefreshToken;

public sealed record RefreshTokenCommand(
    string RefreshToken
) : IRequest<RefreshTokenResponse>;