using AMS.Application.Features.Admin.Users.Queries.GetStudents;
using AMS.Application.Features.Admin.Users.Queries.GetTeachers;

namespace AMS.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<(bool Succeeded, Guid? UserId,IEnumerable<string> Errors)> RegisterAsync(
        string fullName,
        string email,
        string password);

    Task<string?> LoginAsync(
        string email,
        string password);
    Task<bool> IsTeacherAsync(Guid userId);
    
    Task<List<TeacherDto>> GetTeachersAsync();
    
    Task<List<StudentDto>> GetStudentsAsync();
    
    Task<Dictionary<Guid, string>> GetTeacherNamesAsync();
    
    Task<Dictionary<Guid, string>> GetStudentNamesAsync();
    
}