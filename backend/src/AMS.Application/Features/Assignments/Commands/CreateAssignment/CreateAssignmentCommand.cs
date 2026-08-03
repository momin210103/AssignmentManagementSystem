using MediatR;

namespace AMS.Application.Features.Assignments.Commands.CreateAssignment;

public record CreateAssignmentCommand(
    CreateAssignmentRequest Request)
    : IRequest<CreateAssignmentResponse>;