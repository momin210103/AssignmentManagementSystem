namespace AMS.Application.Features.Assignments.Commands.CreateAssignment;

public class CreateAssignmentRequest
{
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime Deadline { get; set; }

    public int MaximumMarks { get; set; }

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }
}