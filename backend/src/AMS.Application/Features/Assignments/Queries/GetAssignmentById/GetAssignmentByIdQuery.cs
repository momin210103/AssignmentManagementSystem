using AMS.Application.Features.Assignments.DTOs;
using MediatR;

namespace AMS.Application.Features.Assignments.Queries.GetAssignmentById;

public record GetAssignmentByIdQuery(Guid Id)
    : IRequest<AssignmentDto?>;