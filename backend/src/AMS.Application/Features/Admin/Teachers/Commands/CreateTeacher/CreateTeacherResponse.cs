namespace AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;

public class CreateTeacherResponse
{
    public Guid TeacherId { get; set; }

    public string Message { get; set; } = string.Empty;
}