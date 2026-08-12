using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace AMS.Application.Features.Admin.Classes.Commands.RemoveStudentFromClass
{
    public record RemoveStudentFromClassCommand(
    Guid ClassId,
    Guid StudentId
) : IRequest<RemoveStudentFromClassResponse>;
}