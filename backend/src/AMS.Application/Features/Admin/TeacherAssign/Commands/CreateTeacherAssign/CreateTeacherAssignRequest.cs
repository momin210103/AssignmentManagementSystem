namespace AMS.Application.Features.Admin.TeacherAssign.Commands.CreateTeacherAssign;

public class CreateTeacherAssignRequest
{
    public Guid TeacherId { get; set; }

    public Guid ClassId { get; set; }

    public Guid SubjectId { get; set; }
    
}