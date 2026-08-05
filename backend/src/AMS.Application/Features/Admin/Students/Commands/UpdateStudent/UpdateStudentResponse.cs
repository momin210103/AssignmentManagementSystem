namespace AMS.Application.Features.Admin.Students.Commands.UpdateStudent;

public class UpdateStudentResponse
{
    public Guid StudentId { get; set; }

    public string Message { get; set; } = string.Empty;
}