using MediatR;

namespace AMS.Application.Features.Admin.Students.Commands.UpdateStudent;

public record UpdateStudentCommand (Guid Id,UpdateStudentRequest Request) : IRequest<UpdateStudentResponse>;
