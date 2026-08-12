using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace AMS.Application.Features.Admin.Classes.Commands.DeleteClassCommands
{
    public record DeleteClassCommand(Guid ClassId) : IRequest<DeleteClassCommandResponse>;
}