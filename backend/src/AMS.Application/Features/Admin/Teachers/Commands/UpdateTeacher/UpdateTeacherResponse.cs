namespace AMS.Application.Features.Admin.Teachers.Commands.UpdateTeacher;

public class UpdateTeacherResponse
{
    public Guid TeacherId { get; set; }

    public string Message { get; set; } = string.Empty;
}