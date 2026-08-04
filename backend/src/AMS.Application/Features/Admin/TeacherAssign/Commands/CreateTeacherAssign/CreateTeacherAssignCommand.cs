using MediatR;

namespace AMS.Application.Features.Admin.TeacherAssign.Commands.CreateTeacherAssign;

public record CreateTeacherAssignCommand(CreateTeacherAssignRequest Request) : IRequest<CreateTeacherAssignResponse>;
