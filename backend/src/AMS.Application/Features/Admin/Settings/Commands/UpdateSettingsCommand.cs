using AMS.Application.Features.Admin.Settings.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.Settings.Commands.UpdateSettings;

public sealed record UpdateSettingsCommand(
    string ApplicationName,
    string InstitutionName,
    string SupportEmail,
    int AcademicYear,
    bool MaintenanceMode
) : IRequest<ApplicationSettingsDto>;