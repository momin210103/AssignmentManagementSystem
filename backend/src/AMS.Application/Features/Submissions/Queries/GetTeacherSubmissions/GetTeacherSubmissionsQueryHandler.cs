using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Submissions.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Submissions.Queries.GetTeacherSubmissions;

public class GetTeacherSubmissionsQueryHandler
    : IRequestHandler<GetTeacherSubmissionsQuery, List<SubmissionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public GetTeacherSubmissionsQueryHandler(
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
        GetTeacherSubmissionsQuery request,
        CancellationToken cancellationToken)
    {
        var teacherId = _currentUserService.UserId;

        var submissions = await _context.Submissions
        .AsNoTracking()
        .Include(x => x.Assignment)
        .Where(x => x.Assignment.TeacherId == teacherId)
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