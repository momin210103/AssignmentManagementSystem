using MediatR;

namespace AMS.Application.Features.Submissions.Commands.GradeSubmission;

public record GradeSubmissionCommand(
    Guid SubmissionId,
    GradeSubmissionRequest Request)
    : IRequest<GradeSubmissionResponse>;