namespace AMS.Application.Features.Authentication.Commands.Register;

public sealed class RegisterResponse
{
    public Guid UserId { get; set; }

    public string Email { get; set; } = string.Empty;

    public string Token { get; set; } = string.Empty; 
}