using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Submissions.Commands.GradeSubmission;

public class GradeSubmissionCommandHandler
    : IRequestHandler<GradeSubmissionCommand, GradeSubmissionResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public GradeSubmissionCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<GradeSubmissionResponse> Handle(
        GradeSubmissionCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Submission exists?
        var submission = await _context.Submissions
            .FirstOrDefaultAsync(
                x => x.Id == request.SubmissionId,
                cancellationToken);

        if (submission is null)
            throw new NotFoundException("Submission not found.");

        // 2. Assignment exists?
        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(
                x => x.Id == submission.AssignmentId,
                cancellationToken);

        if (assignment is null)
            throw new NotFoundException("Assignment not found.");

        // 3. Teacher owns this assignment?
        if (assignment.TeacherId != _currentUserService.UserId)
            throw new ForbiddenException(
                "You are not allowed to grade this submission.");

        // 4. Marks validation
        if (request.Request.Marks > assignment.MaximumMarks)
            throw new BadRequestException(
                $"Marks cannot be greater than {assignment.MaximumMarks}.");

        // 5. Grade submission
        submission.Marks = request.Request.Marks;
        submission.Feedback = request.Request.Feedback;
        submission.Status = SubmissionStatus.Reviewed;
        submission.ReviewedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new GradeSubmissionResponse
        {
            Message = "Submission graded successfully."
        };
    }
}