using AMS.Application.Common.Models;
using AMS.Application.Features.Admin.Users.Queries.GetStudents;
using AMS.Application.Features.Admin.Users.Queries.GetTeachers;

namespace AMS.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<(bool Succeeded, Guid? UserId, IEnumerable<string> Errors)> RegisterAsync(
        string fullName,
        string email,
        string password);

    Task<LoginResult?> LoginAsync(
        string email,
        string password);
    Task<bool> IsTeacherAsync(Guid userId);

    Task<List<TeacherDto>> GetTeachersAsync();

    Task<List<StudentDto>> GetStudentsAsync();

    Task<Dictionary<Guid, string>> GetTeacherNamesAsync();

    Task<Dictionary<Guid, string>> GetStudentNamesAsync();

    Task<(bool Succeeded, Guid? UserId, IEnumerable<string> Errors)>
        CreateTeacherAsync(
            string fullName,
            string email,
            string password);

    Task<(bool Succeeded, Guid? UserId, IEnumerable<string> Errors)>
        CreateStudentAsync(
            string fullName,
            string email,
            string password);

    Task<bool> DeleteUserAsync(Guid userId);

    Task UpdateTeacherAsync(
        Guid teacherId,
        string fullName,
        string email);

    Task UpdateStudentAsync(
        Guid studentId,
        string fullName,
        string email);
    Task<string?> GetUserNameAsync(Guid userId);
}