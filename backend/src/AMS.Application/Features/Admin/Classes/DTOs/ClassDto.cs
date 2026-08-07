using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMS.Application.Features.Admin.Classes.DTOs
{
    public class ClassDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Section { get; set; } = string.Empty;

    }
}