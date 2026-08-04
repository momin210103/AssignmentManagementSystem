using MediatR;

namespace AMS.Application.Features.Submissions.Commands.ResubmitSubmission;

public record ResubmitSubmissionCommand(
    Guid SubmissionId,
    ResubmitSubmissionRequest Request)
    : IRequest<ResubmitSubmissionResponse>;