using AMS.Application.Features.Submissions.DTOs;
using MediatR;

namespace AMS.Application.Features.Submissions.Queries.GetAssignmentSubmissions;

public record GetAssignmentSubmissionsQuery(Guid AssignmentId)
    : IRequest<List<SubmissionDto>>;