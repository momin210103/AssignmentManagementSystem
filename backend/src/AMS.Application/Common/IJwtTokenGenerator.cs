namespace AMS.Application.Common;

public interface IJwtTokenGenerator
{
    Task<string> GenerateTokenAsync(Guid userId, string email,IList<string> roles);
}