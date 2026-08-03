using AMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AMS.Infrastructure.Persistence.Configurations;

public class SubmissionConfiguration : IEntityTypeConfiguration<Submission>
{
    public void Configure(EntityTypeBuilder<Submission> builder)
    {
        builder.ToTable("Submissions");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Answer)
            .IsRequired();

        builder.Property(x => x.Status)
            .HasConversion<string>();

        builder.Property(x => x.Marks)
            .HasPrecision(5,2);

        builder.HasIndex(x => new
        {
            x.AssignmentId,
            x.StudentId
        }).IsUnique();
    }
}