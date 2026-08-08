namespace AMS.Application.Features.Admin.TeacherAssign.DTOs;

public class TeacherAssignDto
{
    public Guid Id { get; set; }

    public Guid TeacherId { get; set; }

    public string TeacherName { get; set; } = string.Empty;

    public Guid ClassId { get; set; }
    public string ClassName { get; set; } = string.Empty;

    public Guid SubjectId { get; set; }
    public string SubjectName { get; set; } = string.Empty;
}