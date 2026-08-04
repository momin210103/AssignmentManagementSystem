using FluentValidation;

namespace AMS.Application.Features.Submissions.Commands.CreateSubmission;

public class CreateSubmissionValidator : AbstractValidator<CreateSubmissionCommand>
{
    public CreateSubmissionValidator()
    {
        RuleFor(x => x.Request.AssignmentId)
            .NotEmpty().WithMessage("AssignmentId is required");
        RuleFor(x => x.Request.Answer)
            .NotEmpty().MaximumLength(5000);
    }
}