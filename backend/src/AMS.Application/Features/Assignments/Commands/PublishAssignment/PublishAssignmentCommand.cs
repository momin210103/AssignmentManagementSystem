using MediatR;

namespace AMS.Application.Features.Assignments.Commands.PublishAssignment;

public record PublishAssignmentCommand(Guid Id)
    : IRequest<PublishAssignmentResponse>;