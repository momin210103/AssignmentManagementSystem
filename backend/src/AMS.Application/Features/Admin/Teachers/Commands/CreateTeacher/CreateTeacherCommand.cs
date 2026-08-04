using MediatR;

namespace AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;

public record CreateTeacherCommand(
    CreateTeacherRequest Request)
    : IRequest<CreateTeacherResponse>;