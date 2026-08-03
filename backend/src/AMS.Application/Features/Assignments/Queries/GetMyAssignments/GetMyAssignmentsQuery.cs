using AMS.Application.Features.Assignments.DTOs;
using MediatR;

namespace AMS.Application.Features.Assignments.Queries.GetMyAssignments;

public record GetMyAssignmentsQuery
    : IRequest<List<AssignmentDto>>;