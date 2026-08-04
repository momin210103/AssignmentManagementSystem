namespace AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;

public class CreateTeacherRequest
{
    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}