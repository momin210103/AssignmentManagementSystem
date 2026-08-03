using AMS.Domain.Common;
using AMS.Domain.Enums;

namespace AMS.Domain.Entities;

public class Submission : BaseEntity
{
    public Guid AssignmentId { get; set; }

    public Guid StudentId { get; set; }

    public string Answer { get; set; } = string.Empty;

    public DateTime SubmittedAt { get; set; }

    public decimal? Marks { get; set; }

    public string? Feedback { get; set; }

    public SubmissionStatus Status { get; set; }
    
}