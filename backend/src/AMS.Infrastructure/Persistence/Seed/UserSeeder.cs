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
            "Dr. Sarah Ahmed",
            "sarah.ahmed@gmail.com",
            "Teacher@123",
            Roles.Teacher);

        await SeedUserAsync(
            userManager,
            "Michael Johnson",
            "michael.johnson@gmail.com",
            "Teacher@123",
            Roles.Teacher);

        await SeedUserAsync(
            userManager,
            "James Wilson",
            "james.wilson@gmail.com",
            "Teacher@123",
            Roles.Teacher);

        await SeedUserAsync(
            userManager,
            "Ayesha Rahman",
            "ayesha.rahman@gmail.com",
            "Student@123",
            Roles.Student);

        await SeedUserAsync(
            userManager,
            "Tanvir Hasan",
            "tanvir.hasan@gmail.com",
            "Student@123",
            Roles.Student);

        await SeedUserAsync(
            userManager,
            "Nusrat Jahan",
            "nusrat.jahan@gmail.com",
            "Student@123",
            Roles.Student);

        await SeedUserAsync(
            userManager,
            "Rakib Hossain",
            "rakib.hossain@gmail.com",
            "Student@123",
            Roles.Student);

        await SeedUserAsync(
            userManager,
            "Sadia Islam",
            "sadia.islam@gmail.com",
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