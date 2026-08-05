namespace AMS.Application.Features.Admin.Students.Commands.UpdateStudent;

public class UpdateStudentRequest
{
    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public Guid ClassId { get; set; }
}