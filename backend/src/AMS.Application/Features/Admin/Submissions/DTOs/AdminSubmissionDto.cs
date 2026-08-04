using AMS.Domain.Enums;

namespace AMS.Application.Features.Admin.Submissions.DTOs;

public class AdminSubmissionDto
{
    public Guid Id { get; set; }

    public string StudentName { get; set; } = string.Empty;
    
    public Guid StudentId { get; set; }

    public string AssignmentTitle { get; set; } = string.Empty;

    public string SubjectName { get; set; } = string.Empty;

    public string ClassName { get; set; } = string.Empty;

    public decimal? Marks { get; set; }

    public SubmissionStatus Status { get; set; }

    public DateTime SubmittedAt { get; set; }
}