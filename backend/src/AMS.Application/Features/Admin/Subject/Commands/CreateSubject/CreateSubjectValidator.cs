using FluentValidation;

namespace AMS.Application.Features.Admin.Subject.Commands.CreateSubject;

public class CreateSubjectValidator : AbstractValidator<CreateSubjectCommand>
{
    public CreateSubjectValidator()
    {
        RuleFor(x => x.Request.Name)
            .NotEmpty()
            .MaximumLength(100);
    }
}