using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Settings.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Settings.Commands.UpdateSettings;

public sealed class UpdateSettingsCommandHandler
    : IRequestHandler<UpdateSettingsCommand, ApplicationSettingsDto>
{
    private readonly IApplicationDbContext _context;

    public UpdateSettingsCommandHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ApplicationSettingsDto> Handle(
        UpdateSettingsCommand request,
        CancellationToken cancellationToken)
    {
        var settings = await _context.ApplicationSettings
            .FirstOrDefaultAsync(cancellationToken);

        if (settings is null)
        {
            throw new NotFoundException(
                "Application settings not found.");
        }

        settings.ApplicationName = request.ApplicationName;
        settings.InstitutionName = request.InstitutionName;
        settings.SupportEmail = request.SupportEmail;
        settings.AcademicYear = request.AcademicYear;
        settings.MaintenanceMode = request.MaintenanceMode;

        await _context.SaveChangesAsync(cancellationToken);

        return new ApplicationSettingsDto
        {
            Id = settings.Id,
            ApplicationName = settings.ApplicationName,
            InstitutionName = settings.InstitutionName,
            SupportEmail = settings.SupportEmail,
            AcademicYear = settings.AcademicYear,
            MaintenanceMode = settings.MaintenanceMode
        };
    }
}