namespace AMS.Application.Features.Profile.DTOs;

public class MyProfileDto
{
    public Guid Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    // Student
    public ProfileClassDto? Class { get; set; }

    // Teacher
    public List<ProfileClassDto> Classes { get; set; } = [];

    // Student + Teacher
    public List<ProfileSubjectDto> Subjects { get; set; } = [];
}

public class ProfileClassDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Section { get; set; } = string.Empty;
}

public class ProfileSubjectDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;
}