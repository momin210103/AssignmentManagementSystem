using AMS.Application.Common;
using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace AMS.Application.Features.Authentication.Commands.RefreshToken;

public sealed class RefreshTokenCommandHandler
    : IRequestHandler<RefreshTokenCommand, RefreshTokenResponse>
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IIdentityService _identityService;

    public RefreshTokenCommandHandler(
        IJwtTokenGenerator jwtTokenGenerator,
        IIdentityService identityService)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _identityService = identityService;
    }

    public async Task<RefreshTokenResponse> Handle(
        RefreshTokenCommand request,
        CancellationToken cancellationToken)
    {
        Guid userId;
        string email;

        try
        {
            (userId, email) =
                await _jwtTokenGenerator.ValidateRefreshTokenAsync(
                    request.RefreshToken);
        }
        catch (SecurityTokenException)
        {
            throw new BadRequestException(
                "Invalid or expired refresh token.");
        }
        catch (ArgumentException)
        {
            throw new BadRequestException(
                "Invalid refresh token.");
        }

        var role = await _identityService.GetUserRoleAsync(userId);

        if (role is null)
        {
            throw new NotFoundException("User not found.");
        }

        var roles = new List<string> { role };

        var newAccessToken =
            await _jwtTokenGenerator.GenerateTokenAsync(
                userId,
                email,
                roles);

        var newRefreshToken =
            await _jwtTokenGenerator.GenerateRefreshTokenAsync(
                userId,
                email);

        return new RefreshTokenResponse
        {
            Token = newAccessToken,
            RefreshToken = newRefreshToken
        };
    }
}