using AMS.Domain.Common;

namespace AMS.Domain.Entities;

public class TeacherSubject : BaseEntity
{
    public Guid TeacherId { get; set; }

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }
    
}