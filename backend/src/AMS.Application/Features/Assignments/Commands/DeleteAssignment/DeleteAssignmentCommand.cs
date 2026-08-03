using MediatR;

namespace AMS.Application.Features.Assignments.Commands.DeleteAssignment;

public record DeleteAssignmentCommand(Guid Id)
    : IRequest<DeleteAssignmentResponse>;