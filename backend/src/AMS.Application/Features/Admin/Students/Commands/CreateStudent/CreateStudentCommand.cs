using MediatR;

namespace AMS.Application.Features.Admin.Students.Commands.CreateStudent;

public record CreateStudentCommand(
    CreateStudentRequest Request)
    : IRequest<CreateStudentResponse>;