namespace AMS.Application.Features.Admin.Students.Commands.CreateStudent;

public class CreateStudentResponse
{
    public Guid StudentId { get; set; }

    public string Message { get; set; } = string.Empty;
}