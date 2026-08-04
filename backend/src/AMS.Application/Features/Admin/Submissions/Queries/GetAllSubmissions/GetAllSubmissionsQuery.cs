using AMS.Application.Features.Admin.Submissions.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.Submissions.Queries.GetAllSubmissions;

public record GetAllSubmissionsQuery
    : IRequest<List<AdminSubmissionDto>>;