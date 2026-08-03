using AMS.Application.Common;
using AMS.Application.Common.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace AMS.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userManager = userManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<(bool Succeeded,Guid? UserId, IEnumerable<string> Errors)> RegisterAsync(
        string fullName,
        string email,
        string password)
    {
        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            FullName = fullName,
            UserName = email,
            Email = email
        };

        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            return (true, user.Id, Enumerable.Empty<string>());
        }

        return (false, null, result.Errors.Select(x => x.Description));
    }

    public async Task<string?> LoginAsync(
        string email,
        string password)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null)
            return null;

        var validPassword = await _userManager.CheckPasswordAsync(user, password);

        if (!validPassword)
            return null;

        return await _jwtTokenGenerator.GenerateTokenAsync(
            user.Id,
            user.Email!);
    }
}