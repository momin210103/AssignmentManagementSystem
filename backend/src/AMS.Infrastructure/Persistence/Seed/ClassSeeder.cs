using AMS.Domain.Entities;
using AMS.Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AMS.Infrastructure.Persistence.Seed;

public static class ClassSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

        if (await context.ClassRooms.AnyAsync())
            return;

        var classRooms = new List<ClassRoom>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Level 1",
                Section = "A"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Level 1",
                Section = "B"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Level 2",
                Section = "A"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Level 2",
                Section = "B"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Level 3",
                Section = "A"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "Level 4",
                Section = "A"
            }
        };

        await context.ClassRooms.AddRangeAsync(classRooms);
        await context.SaveChangesAsync();
    }
}