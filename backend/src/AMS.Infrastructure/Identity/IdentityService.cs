using AMS.Application.Common;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Users.Queries.GetStudents;
using AMS.Application.Features.Admin.Users.Queries.GetTeachers;
using AMS.Domain.Constants;
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
            await _userManager.AddToRoleAsync(user, Roles.Student);

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
        var roles = await _userManager.GetRolesAsync(user);
        

        return await _jwtTokenGenerator.GenerateTokenAsync(
            user.Id,
            user.Email!,
            roles);
    }

    public async Task<bool> IsTeacherAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user is null)
            return false;

        var roles = await _userManager.GetRolesAsync(user);

        return roles.Contains("Teacher");
    }

    public async Task<List<TeacherDto>> GetTeachersAsync()
    {
        var teachers = await _userManager.GetUsersInRoleAsync("Teacher");
        return teachers.Select(x => new TeacherDto
        {
            Id = x.Id,
            FullName = x.FullName,
            Email = x.Email!
        }).ToList();
        
    }
    public async Task<List<StudentDto>> GetStudentsAsync()
    {
        var students = await _userManager.GetUsersInRoleAsync("Student");

        return students.Select(x => new StudentDto
        {
            Id = x.Id,
            FullName = x.FullName,
            Email = x.Email ?? string.Empty,
            PhoneNumber = x.PhoneNumber
        }).ToList();
    }

    public async Task<Dictionary<Guid, string>> GetTeacherNamesAsync()
    {
        var teachers = await _userManager.GetUsersInRoleAsync("Teacher");

        return teachers.ToDictionary(
            x => x.Id,
            x => x.FullName);
    }
    
    public async Task<Dictionary<Guid, string>> GetStudentNamesAsync()
    {
        var students = await _userManager.GetUsersInRoleAsync("Student");

        return students.ToDictionary(
            x => x.Id,
            x => x.FullName);
    }

    public async Task<(bool Succeeded, Guid? UserId, IEnumerable<string> Errors)> CreateTeacherAsync(string fullName, string email, string password)
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
            await _userManager.AddToRoleAsync(user, Roles.Teacher);

            return (true, user.Id, Enumerable.Empty<string>());
        }

        return (false, null, result.Errors.Select(x => x.Description));
    }

    public async Task<(bool Succeeded, Guid? UserId, IEnumerable<string> Errors)> CreateStudentAsync(string fullName, string email, string password)
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
            await _userManager.AddToRoleAsync(user, Roles.Student);

            return (true, user.Id, Enumerable.Empty<string>());
        }

        return (false, null, result.Errors.Select(x => x.Description));
        
    }
    public async Task<bool> DeleteUserAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user is null)
            return false;

        var result = await _userManager.DeleteAsync(user);

        return result.Succeeded;
    }
}