using AMS.Domain.Entities;
using AMS.Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AMS.Infrastructure.Persistence.Seed;

public static class ApplicationSettingsSeeder
{
    public static async Task SeedAsync(
        IServiceProvider serviceProvider)
    {
        var context = serviceProvider
            .GetRequiredService<ApplicationDbContext>();

        var exists = await context.ApplicationSettings
            .AnyAsync();

        if (exists)
            return;

        var settings = new ApplicationSetting
        {
            Id = Guid.NewGuid(),
            ApplicationName = "AMS",
            InstitutionName = "OnnoRokom School",
            SupportEmail = "support@ams.com",
            AcademicYear = 2026,
            MaintenanceMode = false
        };

        context.ApplicationSettings.Add(settings);

        await context.SaveChangesAsync();
    }
}