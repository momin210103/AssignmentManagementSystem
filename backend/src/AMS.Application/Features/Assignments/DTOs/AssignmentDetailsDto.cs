using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMS.Application.Features.Assignments.DTOs
{
    public class AssignmentDetailsDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime Deadline { get; set; }

        public int MaximumMarks { get; set; }

        public string Status { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public Guid TeacherId { get; set; }

        public string? TeacherName { get; set; }

        public Guid ClassId { get; set; }

        public string ClassName { get; set; } = string.Empty;

        public string Section { get; set; } = string.Empty;

        public Guid SubjectId { get; set; }

        public string SubjectName { get; set; } = string.Empty;
    }
}