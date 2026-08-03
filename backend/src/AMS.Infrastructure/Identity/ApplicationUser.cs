using Microsoft.AspNetCore.Identity;

namespace AMS.Infrastructure.Identity;

public class ApplicationUser : IdentityUser<Guid>
{
    public required string FullName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
}