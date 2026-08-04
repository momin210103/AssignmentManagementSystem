using MediatR;

namespace AMS.Application.Features.Admin.Users.Queries.GetStudents;

public record GetStudentsQuery
    : IRequest<List<StudentDto>>;