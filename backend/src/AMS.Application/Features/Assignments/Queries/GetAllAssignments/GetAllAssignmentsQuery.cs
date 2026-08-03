using AMS.Application.Features.Assignments.DTOs;
using MediatR;

namespace AMS.Application.Features.Assignments.Queries.GetAllAssignments;

public record GetAllAssignmentsQuery
    : IRequest<List<AssignmentDto>>;