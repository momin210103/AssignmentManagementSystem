namespace AMS.Application.Features.Admin.Users.Queries.GetTeachers;

public class TeacherDto
{
    public Guid Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
}