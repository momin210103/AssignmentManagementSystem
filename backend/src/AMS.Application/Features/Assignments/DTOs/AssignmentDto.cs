namespace AMS.Application.Features.Assignments.DTOs;

public class AssignmentDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime Deadline { get; set; }

    public int MaximumMarks { get; set; }

    public string Status { get; set; } = string.Empty;

    public Guid TeacherId { get; set; }

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }

    public DateTime CreatedAt { get; set; }
}