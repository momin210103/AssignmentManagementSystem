namespace AMS.Application.Features.Submissions.Commands.CreateSubmission;

public class CreateSubmissionRequest
{
    public Guid AssignmentId { get; set; }
    
    public string Answer { get; set; } = string.Empty;
    
    public string? FileUrl { get; set; } = string.Empty;
}