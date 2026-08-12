using AMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AMS.Infrastructure.Persistence.Configurations;

public class ApplicationSettingConfiguration
    : IEntityTypeConfiguration<ApplicationSetting>
{
    public void Configure(
        EntityTypeBuilder<ApplicationSetting> builder)
    {
        builder.ToTable("ApplicationSettings");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ApplicationName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.InstitutionName)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.SupportEmail)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.AcademicYear)
            .IsRequired();

        builder.Property(x => x.MaintenanceMode)
            .IsRequired();
    }
}