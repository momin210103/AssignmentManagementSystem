using AMS.Application.Features.Submissions.DTOs;
using MediatR;

namespace AMS.Application.Features.Submissions.Queries.GetTeacherSubmissions;

public record GetTeacherSubmissionsQuery
    : IRequest<List<SubmissionDto>>;