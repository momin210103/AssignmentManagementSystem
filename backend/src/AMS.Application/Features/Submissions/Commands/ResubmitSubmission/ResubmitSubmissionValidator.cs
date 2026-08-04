using FluentValidation;

namespace AMS.Application.Features.Submissions.Commands.ResubmitSubmission;

public class ResubmitSubmissionValidator
    : AbstractValidator<ResubmitSubmissionCommand>
{
    public ResubmitSubmissionValidator()
    {
        RuleFor(x => x.Request.Answer)
            .NotEmpty()
            .MaximumLength(5000);
    }
}