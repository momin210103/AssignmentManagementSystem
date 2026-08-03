namespace AMS.Domain.Entities;

public class TeacherSubject
{
    public Guid TeacherId { get; set; }

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }
}