using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Submissions.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Submissions.Queries.GetAssignmentSubmissions;

public class GetAssignmentSubmissionsQueryHandler
    : IRequestHandler<GetAssignmentSubmissionsQuery, List<SubmissionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public GetAssignmentSubmissionsQueryHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService,
        IIdentityService identityService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
        _identityService = identityService;
    }

    public async Task<List<SubmissionDto>> Handle(
        GetAssignmentSubmissionsQuery request,
        CancellationToken cancellationToken)
    {
        var assignment = await _context.Assignments
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Id == request.AssignmentId,
                cancellationToken);

        if (assignment is null)
            throw new NotFoundException("Assignment not found.");

        if (assignment.TeacherId != _currentUserService.UserId)
            throw new ForbiddenException(
                "You are not allowed to view these submissions.");

        var submissions = await _context.Submissions
            .AsNoTracking()
            .Where(x => x.AssignmentId == request.AssignmentId)
            .OrderByDescending(x => x.SubmittedAt)
            .ToListAsync(cancellationToken);

        var studentNames = await _identityService.GetStudentNamesAsync();

        var result = _mapper.Map<List<SubmissionDto>>(submissions);

        foreach (var submission in result)
        {
            if (studentNames.TryGetValue(
                submission.StudentId,
                out var studentName))
            {
                submission.StudentName = studentName;
            }
        }

        return result;
    }
}