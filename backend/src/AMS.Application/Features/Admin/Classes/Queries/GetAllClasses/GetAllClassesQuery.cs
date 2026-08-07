using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Features.Admin.Classes.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.Classes.Queries.GetAllClasses
{
    public record GetAllClassesQuery() : IRequest<List<ClassDto>>;
}