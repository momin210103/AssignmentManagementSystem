using FluentValidation;

namespace AMS.Application.Features.Admin.Settings.Commands.UpdateSettings;

public sealed class UpdateSettingsValidator
    : AbstractValidator<UpdateSettingsCommand>
{
    public UpdateSettingsValidator()
    {
        RuleFor(x => x.ApplicationName)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.InstitutionName)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.SupportEmail)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.AcademicYear)
            .InclusiveBetween(2000, 2100);
    }
}