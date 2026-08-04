using AMS.Application.Features.Submissions.DTOs;
using MediatR;

namespace AMS.Application.Features.Submissions.Queries.GetMySubmissions;

public record GetMySubmissionsQuery
    : IRequest<List<SubmissionDto>>;