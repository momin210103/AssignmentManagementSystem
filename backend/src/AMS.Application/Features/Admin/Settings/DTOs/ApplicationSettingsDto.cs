namespace AMS.Application.Features.Admin.Settings.DTOs;

public class ApplicationSettingsDto
{
    public Guid Id { get; set; }

    public string ApplicationName { get; set; } = string.Empty;

    public string InstitutionName { get; set; } = string.Empty;

    public string SupportEmail { get; set; } = string.Empty;

    public int AcademicYear { get; set; }

    public bool MaintenanceMode { get; set; }
}