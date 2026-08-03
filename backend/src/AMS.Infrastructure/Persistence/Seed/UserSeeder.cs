using AMS.Domain.Constants;
using AMS.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace AMS.Infrastructure.Persistence.Seed;

public static class UserSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        await SeedUserAsync(
            userManager,
            "Admin",
            "admin@gmail.com",
            "Admin@123",
            Roles.Admin);

        await SeedUserAsync(
            userManager,
            "Teacher 1",
            "teacher1@gmail.com",
            "Teacher@123",
            Roles.Teacher);
        await SeedUserAsync(
            userManager,
            "Teacher 2",
            "teacher2@gmail.com",
            "Teacher@123",
            Roles.Teacher);
        await SeedUserAsync(
            userManager,
            "Teacher 3",
            "teacher3@gmail.com",
            "Teacher@123",
            Roles.Teacher);

        await SeedUserAsync(
            userManager,
            "Student 1",
            "student1@gmail.com",
            "Student@123",
            Roles.Student);
        await SeedUserAsync(
            userManager,
            "Student 2",
            "student2@gmail.com",
            "Student@123",
            Roles.Student);
        await SeedUserAsync(
            userManager,
            "Student 3",
            "student3@gmail.com",
            "Student@123",
            Roles.Student);
        await SeedUserAsync(
            userManager,
            "Student 4",
            "student4@gmail.com",
            "Student@123",
            Roles.Student);
        await SeedUserAsync(
            userManager,
            "Student 5",
            "student5@gmail.com",
            "Student@123",
            Roles.Student);
    }

    private static async Task SeedUserAsync(
        UserManager<ApplicationUser> userManager,
        string fullName,
        string email,
        string password,
        string role)
    {
        var existingUser = await userManager.FindByEmailAsync(email);

        if (existingUser != null)
            return;

        var user = new ApplicationUser
        {
            FullName = fullName,
            UserName = email,
            Email = email,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(user, password);

        if (!result.Succeeded)
            return;

        await userManager.AddToRoleAsync(user, role);
    }
}