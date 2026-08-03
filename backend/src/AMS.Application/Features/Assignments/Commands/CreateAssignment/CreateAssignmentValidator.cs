using FluentValidation;

namespace AMS.Application.Features.Assignments.Commands.CreateAssignment;

public class CreateAssignmentValidator
    : AbstractValidator<CreateAssignmentCommand>
{
    public CreateAssignmentValidator()
    {
        RuleFor(x => x.Request.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Request.Description)
            .MaximumLength(1000);

        RuleFor(x => x.Request.MaximumMarks)
            .GreaterThan(0);

        RuleFor(x => x.Request.Deadline)
            .GreaterThan(DateTime.UtcNow);

        RuleFor(x => x.Request.ClassId)
            .NotEmpty();

        RuleFor(x => x.Request.SubjectId)
            .NotEmpty();
    }
}