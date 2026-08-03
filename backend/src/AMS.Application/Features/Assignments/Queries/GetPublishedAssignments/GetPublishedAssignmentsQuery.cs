using AMS.Application.Features.Assignments.DTOs;
using MediatR;

namespace AMS.Application.Features.Assignments.Queries.GetPublishedAssignments;

public record GetPublishedAssignmentsQuery
    : IRequest<List<AssignmentDto>>;