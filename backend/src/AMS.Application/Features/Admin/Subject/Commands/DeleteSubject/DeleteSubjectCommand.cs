using AMS.Application.Features.Admin.Subject.Commands.DeleteSubject;
using MediatR;

namespace AMS.Application.Features.Admin.Subjects.Commands.DeleteSubject;

public record DeleteSubjectCommand(Guid Id)
    : IRequest<DeleteSubjectResponse>;