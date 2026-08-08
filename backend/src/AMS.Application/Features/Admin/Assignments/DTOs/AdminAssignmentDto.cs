using AMS.Domain.Enums;

namespace AMS.Application.Features.Admin.Assignments.DTOs;

public class AdminAssignmentDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string TeacherName { get; set; } = string.Empty;
    
    public Guid TeacherId { get; set; }

    public Guid ClassId { get; set; }

    public string ClassName { get; set; } = string.Empty;

    public Guid SubjectId { get; set; }
    public string SubjectName { get; set; } = string.Empty;

    public AssignmentStatus Status { get; set; }

    public DateTime Deadline { get; set; }
}