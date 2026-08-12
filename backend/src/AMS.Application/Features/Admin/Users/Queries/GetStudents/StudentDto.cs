namespace AMS.Application.Features.Admin.Users.Queries.GetStudents;

public class StudentDto
{
    public Guid Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
    
    public string? PhoneNumber { get; set; } = string.Empty;

    public Guid? ClassId { get; set; } 
    public string? ClassName { get; set; } = string.Empty;
    public string? Section { get; set; } = string.Empty;
}