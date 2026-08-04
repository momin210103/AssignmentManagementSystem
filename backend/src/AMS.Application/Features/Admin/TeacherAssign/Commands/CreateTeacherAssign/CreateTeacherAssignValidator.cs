using FluentValidation;

namespace AMS.Application.Features.Admin.TeacherAssign.Commands.CreateTeacherAssign;

public class CreateTeacherAssignValidator : AbstractValidator<CreateTeacherAssignCommand>
{
    public CreateTeacherAssignValidator()
    {
        RuleFor(x => x.Request.TeacherId)
            .NotEmpty();

        RuleFor(x => x.Request.ClassId)
            .NotEmpty();

        RuleFor(x => x.Request.SubjectId)
            .NotEmpty();
    }
}