using AMS.Application.Common;
using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Common.Models;
using AMS.Application.Features.Admin.Users.Queries.GetStudents;
using AMS.Application.Features.Admin.Users.Queries.GetTeachers;
using AMS.Application.Features.Authentication.Commands.Login;
using AMS.Domain.Constants;
using AMS.Infrastructure.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AMS.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    private readonly ApplicationDbContext _context;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IJwtTokenGenerator jwtTokenGenerator,
        ApplicationDbContext context)
    {
        _userManager = userManager;
        _jwtTokenGenerator = jwtTokenGenerator;
        _context = context;
    }

    public async Task<(bool Succeeded, Guid? UserId, IEnumerable<string> Errors)> RegisterAsync(
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

    public async Task<LoginResult?> LoginAsync(
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

        var token = await _jwtTokenGenerator.GenerateTokenAsync(
            user.Id,
            user.Email!,
            roles);

        return new LoginResult
        {
            Token = token,
            FullName = user.FullName,
            Email = user.Email!,
            Role = roles.FirstOrDefault() ?? string.Empty
        };
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
    var students = await (
        from user in _context.Users
        join studentClass in _context.StudentClasses
            on user.Id equals studentClass.StudentId
        join classRoom in _context.ClassRooms
            on studentClass.ClassId equals classRoom.Id
        select new StudentDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Email = user.Email!,
            PhoneNumber = user.PhoneNumber,

            ClassId = classRoom.Id,
            ClassName = classRoom.Name,
            Section = classRoom.Section
        })
        .ToListAsync();

    return students;
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

    public async Task UpdateTeacherAsync(
        Guid teacherId,
        string fullName,
        string email)
    {
        var teacher = await _userManager.FindByIdAsync(teacherId.ToString());

        if (teacher is null)
            throw new NotFoundException("Teacher not found.");

        var emailExists = await _userManager.FindByEmailAsync(email);

        if (emailExists is not null && emailExists.Id != teacherId)
            throw new BadRequestException("Email already exists.");

        teacher.FullName = fullName;
        teacher.Email = email;
        teacher.UserName = email;

        var result = await _userManager.UpdateAsync(teacher);

        if (!result.Succeeded)
            throw new BadRequestException(
                string.Join(", ", result.Errors.Select(x => x.Description)));
    }

    public async Task UpdateStudentAsync(
        Guid studentId,
        string fullName,
        string email)
    {
        var student = await _userManager.FindByIdAsync(studentId.ToString());

        if (student is null)
            throw new NotFoundException("Student not found.");

        var existingUser = await _userManager.FindByEmailAsync(email);

        if (existingUser is not null && existingUser.Id != studentId)
            throw new BadRequestException("Email already exists.");

        student.FullName = fullName;
        student.Email = email;
        student.UserName = email;

        var result = await _userManager.UpdateAsync(student);

        if (!result.Succeeded)
        {
            throw new BadRequestException(
                string.Join(", ", result.Errors.Select(x => x.Description)));
        }
    }
}