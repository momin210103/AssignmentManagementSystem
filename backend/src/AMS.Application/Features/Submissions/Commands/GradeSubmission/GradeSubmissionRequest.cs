namespace AMS.Application.Features.Submissions.Commands.GradeSubmission;

public class GradeSubmissionRequest
{
    public decimal Marks { get; set; }

    public string? Feedback { get; set; }
}