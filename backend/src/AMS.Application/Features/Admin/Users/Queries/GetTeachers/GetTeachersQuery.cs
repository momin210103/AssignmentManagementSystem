using MediatR;

namespace AMS.Application.Features.Admin.Users.Queries.GetTeachers;

public record GetTeachersQuery
    : IRequest<List<TeacherDto>>;