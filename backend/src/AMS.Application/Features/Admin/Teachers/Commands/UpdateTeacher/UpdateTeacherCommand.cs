using AMS.Application.Features.Admin.Teachers.Commands.UpdateTeacher;
using MediatR;

public record UpdateTeacherCommand(
    Guid Id,
    UpdateTeacherRequest Request)
    : IRequest<UpdateTeacherResponse>;