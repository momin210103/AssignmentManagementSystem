using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMS.Application.Features.Admin.Summaries.DTOs
{
    public class SummaryDto
    {
        public int TotalTeachers { get; set; }

        public int TotalStudents { get; set; }

        public int TotalAssingments { get; set; }

        public int TotalSubjects { get; set; }

        public int TotalClasses { get; set; }

        public int TotalSubmissions { get; set; }

    }
}