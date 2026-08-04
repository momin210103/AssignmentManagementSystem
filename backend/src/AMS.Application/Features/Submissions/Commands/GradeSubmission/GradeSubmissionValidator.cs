using FluentValidation;

namespace AMS.Application.Features.Submissions.Commands.GradeSubmission;

public class GradeSubmissionValidator
    : AbstractValidator<GradeSubmissionCommand>
{
    public GradeSubmissionValidator()
    {
        RuleFor(x => x.Request.Marks)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.Request.Feedback)
            .MaximumLength(1000);
    }
}