namespace AMS.Application.Common;

public interface IJwtTokenGenerator
{
    Task<string> GenerateTokenAsync(Guid userId, string email, IList<string> roles);
    Task<string> GenerateRefreshTokenAsync(
       Guid userId,
       string email);

    Task<(Guid UserId, string Email)> ValidateRefreshTokenAsync(
    string refreshToken);
}