using MediatR;

namespace AMS.Application.Features.Admin.Teachers.Commands.DeleteTeacher;

public record DeleteTeacherCommand(Guid TeacherId)
    : IRequest<DeleteTeacherResponse>;