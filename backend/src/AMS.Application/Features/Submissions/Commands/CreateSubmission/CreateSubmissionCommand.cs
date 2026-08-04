using MediatR;

namespace AMS.Application.Features.Submissions.Commands.CreateSubmission;

public record CreateSubmissionCommand (CreateSubmissionRequest Request) : IRequest<CreateSubmissionResponse>;
