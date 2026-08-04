using AMS.Application.Features.Submissions.DTOs;
using MediatR;

namespace AMS.Application.Features.Submissions.Queries.GetMySubmissionsById;

public record GetMySubmissionByIdQuery(Guid Id) : IRequest<SubmissionDto>;
