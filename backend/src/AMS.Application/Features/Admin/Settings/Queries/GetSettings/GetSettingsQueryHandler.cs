using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Settings.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Settings.Queries.GetSettings;

public sealed class GetSettingsQueryHandler
    : IRequestHandler<GetSettingsQuery, ApplicationSettingsDto>
{
    private readonly IApplicationDbContext _context;

    public GetSettingsQueryHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ApplicationSettingsDto> Handle(
        GetSettingsQuery request,
        CancellationToken cancellationToken)
    {
        var settings = await _context.ApplicationSettings
            .AsNoTracking()
            .Select(x => new ApplicationSettingsDto
            {
                Id = x.Id,
                ApplicationName = x.ApplicationName,
                InstitutionName = x.InstitutionName,
                SupportEmail = x.SupportEmail,
                AcademicYear = x.AcademicYear,
                MaintenanceMode = x.MaintenanceMode
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (settings is null)
        {
            throw new NotFoundException(
                "Application settings not found.");
        }

        return settings;
    }
}