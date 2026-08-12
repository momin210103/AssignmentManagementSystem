using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMS.Domain.Entities
{
    public class ApplicationSetting
    {
        public Guid Id { get; set; }

        public string ApplicationName { get; set; } = string.Empty;

        public string InstitutionName { get; set; } = string.Empty;

        public string SupportEmail { get; set; } = string.Empty;

        public int AcademicYear { get; set; }

        public bool MaintenanceMode { get; set; }
    }
}