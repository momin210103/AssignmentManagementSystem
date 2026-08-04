namespace AMS.Application.Features.Submissions.Commands.ResubmitSubmission;

public class ResubmitSubmissionRequest
{
    public string Answer { get; set; } = string.Empty;

    public string? FileUrl { get; set; }
}