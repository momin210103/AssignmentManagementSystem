using MediatR;

namespace AMS.Application.Features.Admin.TeacherAssign.Commands.DeleteTeacherAssign;

public record DeleteTeacherAssignCommand(Guid Id)
    : IRequest<DeleteTeacherAssignResponse>;