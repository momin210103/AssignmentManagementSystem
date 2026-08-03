using FluentValidation;

namespace AMS.Application.Features.Authentication.Commands.Register;

public sealed class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Request.FullName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Request.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Request.Password)
            .NotEmpty()
            .MinimumLength(6);

        RuleFor(x => x.Request.ConfirmPassword)
            .Equal(x => x.Request.Password)
            .WithMessage("Password and Confirm Password must match.");
    }
}