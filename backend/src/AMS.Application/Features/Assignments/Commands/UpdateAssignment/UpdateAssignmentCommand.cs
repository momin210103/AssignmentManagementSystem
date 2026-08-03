using MediatR;

namespace AMS.Application.Features.Assignments.Commands.UpdateAssignment;

public record UpdateAssignmentCommand(
    Guid Id,
    UpdateAssignmentRequest Request)
    : IRequest<UpdateAssignmentResponse>;