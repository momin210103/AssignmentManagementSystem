using AMS.Domain.Entities;
using AMS.Infrastructure.Identity;
using AMS.Infrastructure.Persistence.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AMS.Infrastructure.Persistence.Seed;

public static class StudentClassSeeder
{
    public static async Task SeedAsync(
        IServiceProvider serviceProvider)
    {
        var context =
            serviceProvider.GetRequiredService<ApplicationDbContext>();

        var userManager =
            serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        // Prevent duplicate student-class assignments
        if (await context.StudentClasses.AnyAsync())
            return;

        // Get classes
        var classRooms = await context.ClassRooms
            .OrderBy(x => x.Name)
            .ThenBy(x => x.Section)
            .ToListAsync();

        if (classRooms.Count < 4)
            return;

        // Student → Class assignment
        var assignments = new[]
        {
            new
            {
                Email = "ayesha.rahman@gmail.com",
                ClassName = "Level 1",
                Section = "A"
            },
            new
            {
                Email = "tanvir.hasan@gmail.com",
                ClassName = "Level 1",
                Section = "A"
            },
            new
            {
                Email = "nusrat.jahan@gmail.com",
                ClassName = "Level 1",
                Section = "B"
            },
            new
            {
                Email = "rakib.hossain@gmail.com",
                ClassName = "Level 2",
                Section = "A"
            },
            new
            {
                Email = "sadia.islam@gmail.com",
                ClassName = "Level 2",
                Section = "B"
            }
        };

        var studentClasses = new List<StudentClass>();

        foreach (var assignment in assignments)
        {
            var student = await userManager.FindByEmailAsync(
                assignment.Email);

            if (student is null)
                continue;

            var classRoom = classRooms.FirstOrDefault(x =>
                x.Name == assignment.ClassName &&
                x.Section == assignment.Section);

            if (classRoom is null)
                continue;

            studentClasses.Add(new StudentClass
            {
                Id = Guid.NewGuid(),
                StudentId = student.Id,
                ClassId = classRoom.Id
            });
        }

        if (studentClasses.Count == 0)
            return;

        await context.StudentClasses.AddRangeAsync(
            studentClasses);

        await context.SaveChangesAsync();
    }
}