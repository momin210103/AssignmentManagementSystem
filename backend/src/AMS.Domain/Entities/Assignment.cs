using AMS.Domain.Common;
using AMS.Domain.Enums;

namespace AMS.Domain.Entities;

public class Assignment : BaseEntity
{
    public string Title { get; set; } =  string.Empty;
   
    
    
    public string? Description { get; set; } = string.Empty;
    
    public DateTime Deadline { get; set; }
    
    public int MaximumMarks { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public AssignmentStatus Status { get; set; }

    public Guid TeacherId { get; set; }

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }
    
    
}