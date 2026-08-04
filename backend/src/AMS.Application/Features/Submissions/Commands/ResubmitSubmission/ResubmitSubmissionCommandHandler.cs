using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Submissions.Commands.ResubmitSubmission;

public class ResubmitSubmissionCommandHandler
    : IRequestHandler<ResubmitSubmissionCommand, ResubmitSubmissionResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public ResubmitSubmissionCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<ResubmitSubmissionResponse> Handle(
        ResubmitSubmissionCommand request,
        CancellationToken cancellationToken)
    {
        // Submission exists?
        var submission = await _context.Submissions
            .FirstOrDefaultAsync(
                x => x.Id == request.SubmissionId,
                cancellationToken);

        if (submission is null)
            throw new NotFoundException("Submission not found.");

        // Only owner can resubmit
        if (submission.StudentId != _currentUserService.UserId)
            throw new ForbiddenException(
                "You are not allowed to update this submission.");

        // Assignment exists?
        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(
                x => x.Id == submission.AssignmentId,
                cancellationToken);

        if (assignment is null)
            throw new NotFoundException("Assignment not found.");

        // Deadline check
        if (DateTime.UtcNow > assignment.Deadline)
            throw new BadRequestException(
                "Submission deadline has passed. Resubmission is not allowed.");

        // Strict LMS
        if (submission.Status == SubmissionStatus.Reviewed)
            throw new BadRequestException(
                "This submission has already been reviewed and cannot be resubmitted.");

        // Update
        submission.Answer = request.Request.Answer;
        submission.FileUrl = request.Request.FileUrl;
        submission.SubmittedAt = DateTime.UtcNow;
        submission.Status = SubmissionStatus.Submitted;

        await _context.SaveChangesAsync(cancellationToken);

        return new ResubmitSubmissionResponse
        {
            Message = "Submission updated successfully."
        };
    }
}