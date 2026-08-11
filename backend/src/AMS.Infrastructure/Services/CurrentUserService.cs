using System.Security.Claims;
using AMS.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;

namespace AMS.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid UserId
    {
        get
        {
            var userId = _httpContextAccessor.HttpContext?
                .User?
                .FindFirstValue(ClaimTypes.NameIdentifier);

            return Guid.TryParse(userId, out var id)
                ? id
                : Guid.Empty;
        }
    }

    public string? Email =>
        _httpContextAccessor.HttpContext?
            .User?
            .FindFirstValue(ClaimTypes.Email);

    public bool IsAuthenticated =>
        _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    
    public bool IsInRole(string role)
    {
        return _httpContextAccessor.HttpContext?
            .User?
            .IsInRole(role) ?? false;
    }
}