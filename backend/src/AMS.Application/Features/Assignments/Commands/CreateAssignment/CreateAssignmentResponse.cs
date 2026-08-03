namespace AMS.Application.Features.Assignments.Commands.CreateAssignment;

public class CreateAssignmentResponse
{
    public Guid AssignmentId { get; set; }

    public string Message { get; set; } = string.Empty;
}