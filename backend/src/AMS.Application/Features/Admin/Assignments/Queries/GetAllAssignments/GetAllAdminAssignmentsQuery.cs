using AMS.Application.Features.Admin.Assignments.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.Assignments.Queries.GetAllAssignments;

public record GetAllAdminAssignmentsQuery
    : IRequest<List<AdminAssignmentDto>>;