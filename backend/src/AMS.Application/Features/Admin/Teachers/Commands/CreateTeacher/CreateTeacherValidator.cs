using FluentValidation;

namespace AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;

public class CreateTeacherValidator
    : AbstractValidator<CreateTeacherCommand>
{
    public CreateTeacherValidator()
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
    }
}