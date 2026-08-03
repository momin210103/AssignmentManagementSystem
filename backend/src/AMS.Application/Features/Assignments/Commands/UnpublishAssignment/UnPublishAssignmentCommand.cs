using MediatR;

namespace AMS.Application.Features.Assignments.Commands.UnpublishAssignment;

public record UnPublishAssignmentCommand(Guid Id) :
    IRequest<UnPublishAssignmentResponse>;

    
