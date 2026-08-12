using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Features.Admin.Users.Queries.GetStudents;
using MediatR;

namespace AMS.Application.Features.Admin.Classes.Queries.GetStudentsByClass
{
    public record GetStudentsByClassQuery(Guid ClassId) : IRequest<List<StudentDto>>;
}
    