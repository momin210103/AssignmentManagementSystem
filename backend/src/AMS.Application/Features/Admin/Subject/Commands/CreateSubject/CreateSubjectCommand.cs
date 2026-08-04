using MediatR;

namespace AMS.Application.Features.Admin.Subject.Commands.CreateSubject;

public record CreateSubjectCommand(
    CreateSubjectRequest Request)
    : IRequest<CreateSubjectResponse>;