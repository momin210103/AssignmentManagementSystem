namespace AMS.Application.Features.Assignments.Queries.GetStudentAssignments;

public class GetStudentAssignmentsResponse
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime Deadline { get; set; }

    public int MaximumMarks { get; set; }

    public string Status { get; set; } = string.Empty;

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }

    public DateTime CreatedAt { get; set; }
}