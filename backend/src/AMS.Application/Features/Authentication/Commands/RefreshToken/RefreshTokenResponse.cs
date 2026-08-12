namespace AMS.Application.Features.Authentication.Commands.RefreshToken;

public sealed class RefreshTokenResponse
{
    public string Token { get; set; } = string.Empty;

    public string RefreshToken { get; set; } = string.Empty;
}