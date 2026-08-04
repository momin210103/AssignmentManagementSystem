using MediatR;

namespace AMS.Application.Features.Admin.Students.Commands.DeleteStudent;

public record DeleteStudentCommand(Guid StudentId)
    : IRequest<DeleteStudentResponse>;