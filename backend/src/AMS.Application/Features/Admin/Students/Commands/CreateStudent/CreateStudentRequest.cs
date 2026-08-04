namespace AMS.Application.Features.Admin.Students.Commands.CreateStudent;

public class CreateStudentRequest
{
    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public Guid ClassId { get; set; }
}