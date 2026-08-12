using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMS.Application.Features.Admin.Classes.Commands.CreateClassCommands
{
    public class CreateClassResponse
    {
        public Guid ClassId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}