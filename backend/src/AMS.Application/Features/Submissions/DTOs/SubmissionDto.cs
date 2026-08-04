namespace AMS.Application.Features.Submissions.DTOs;

public class SubmissionDto
{
    public Guid Id { get; set; }

    public Guid AssignmentId { get; set; }

    public Guid StudentId { get; set; }

    public string Answer { get; set; } = string.Empty;

    public string? FileUrl { get; set; }

    public DateTime SubmittedAt { get; set; }

    public decimal? Marks { get; set; }

    public string? Feedback { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime? ReviewedAt { get; set; }
    
}