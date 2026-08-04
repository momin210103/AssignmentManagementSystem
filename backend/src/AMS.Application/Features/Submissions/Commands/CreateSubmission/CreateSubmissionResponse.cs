namespace AMS.Application.Features.Submissions.Commands.CreateSubmission;

public class CreateSubmissionResponse
{
    public Guid SubmissionId { get; set; }
    
    public string Message { get; set; } = string.Empty;
}