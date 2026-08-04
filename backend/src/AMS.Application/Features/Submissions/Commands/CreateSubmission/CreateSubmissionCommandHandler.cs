using AMS.Application.Common.Interfaces;
using AMS.Domain.Entities;
using AMS.Domain.Enums;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Submissions.Commands.CreateSubmission;

public class CreateSubmissionCommandHandler : IRequestHandler<CreateSubmissionCommand, CreateSubmissionResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public CreateSubmissionCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
    {
        _context = context;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }
    public async Task<CreateSubmissionResponse> Handle(CreateSubmissionCommand request, CancellationToken cancellationToken)
    {
        // Assignment exists?
        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(x => x.Id == request.Request.AssignmentId
                , cancellationToken);
        if (assignment is null)
        {
            throw new Exception("Assignment not found");
            
        }
        
        // Assignment Published?
        if (assignment.Status != AssignmentStatus.Published)
            throw new Exception("Assignment Not Published");
        
        // Student belongs to assignment class?
        var studentClass = await _context.StudentClasses
            .FirstOrDefaultAsync(
                x => x.StudentId == _currentUserService.UserId,
                cancellationToken);

        if (studentClass is null)
        {
            throw new Exception("Student is not assigned to any class.");
        }

        if (studentClass.ClassId != assignment.ClassId)
        {
            throw new Exception(
                "You cannot submit this assignment because it is not assigned to your class.");
        }
        // Already Submitted?
        var alreadySubmitted = await _context.Submissions
            .AnyAsync(
                x => x.AssignmentId == request.Request.AssignmentId && x.StudentId == _currentUserService.UserId,
                cancellationToken);
        if (alreadySubmitted)
            throw new Exception("You have already submitted this assignment");
        var submission = _mapper.Map<Submission>(request.Request);
        
        submission.StudentId = _currentUserService.UserId;
        submission.SubmittedAt = DateTime.UtcNow;
        
        submission.Status =
            submission.SubmittedAt > assignment.Deadline
                ? SubmissionStatus.Late
                : SubmissionStatus.Submitted;
        await _context.Submissions.AddAsync(submission, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new CreateSubmissionResponse
        {
            SubmissionId = submission.Id,
            Message = "Assignment submitted successfully."
        };
    }
}