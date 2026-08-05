using AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;
using FluentValidation;

namespace AMS.Application.Features.Admin.Teachers.Commands.UpdateTeacher;

public class UpdateTeacherValidator : AbstractValidator<CreateTeacherCommand>
{
    public UpdateTeacherValidator()
    {
        RuleFor(x => x.Request.FullName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Request.Email)
            .NotEmpty()
            .EmailAddress();
        
    }
    
}