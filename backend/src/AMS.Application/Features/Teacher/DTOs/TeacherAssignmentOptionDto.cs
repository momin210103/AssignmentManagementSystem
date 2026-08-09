namespace AMS.Application.Features.Teacher.DTOs;

public class TeacherAssignmentOptionDto
{
    public Guid ClassId { get; set; }
    public string ClassName { get; set; } = string.Empty;

    public Guid SubjectId { get; set; }
    public string SubjectName { get; set; } = string.Empty;
}