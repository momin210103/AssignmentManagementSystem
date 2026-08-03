using AMS.Domain.Entities;
using AMS.Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AMS.Infrastructure.Persistence.Seed;

public static class SubjectSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

        if (await context.Subjects.AnyAsync())
            return;

        var subjects = new List<Subject>
        {
            new() { Id = Guid.NewGuid(), Name = "C#" },
            new() { Id = Guid.NewGuid(), Name = "ASP.NET Core" },
            new() { Id = Guid.NewGuid(), Name = "Database" },
            new() { Id = Guid.NewGuid(), Name = "Data Structures" },
            new() { Id = Guid.NewGuid(), Name = "Algorithms" },
            new() { Id = Guid.NewGuid(), Name = "Software Engineering" },
            new() { Id = Guid.NewGuid(), Name = "Operating System" },
            new() { Id = Guid.NewGuid(), Name = "Computer Networks" }
        };

        await context.Subjects.AddRangeAsync(subjects);
        await context.SaveChangesAsync();
    }
}