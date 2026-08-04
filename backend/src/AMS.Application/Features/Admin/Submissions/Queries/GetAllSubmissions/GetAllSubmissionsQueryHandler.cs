using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Submissions.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Submissions.Queries.GetAllSubmissions;

public class GetAllSubmissionsQueryHandler
    : IRequestHandler<GetAllSubmissionsQuery, List<AdminSubmissionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;

    public GetAllSubmissionsQueryHandler(
        IApplicationDbContext context,
        IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task<List<AdminSubmissionDto>> Handle(
        GetAllSubmissionsQuery request,
        CancellationToken cancellationToken)
    {
        var studentNames = await _identityService.GetStudentNamesAsync();

        var submissions = await (
            from submission in _context.Submissions
            join assignment in _context.Assignments
                on submission.AssignmentId equals assignment.Id
            join classroom in _context.ClassRooms
                on assignment.ClassId equals classroom.Id
            join subject in _context.Subjects
                on assignment.SubjectId equals subject.Id

            orderby submission.SubmittedAt descending

            select new AdminSubmissionDto
            {
                Id = submission.Id,

                StudentId = submission.StudentId,

                AssignmentTitle = assignment.Title,

                SubjectName = subject.Name,

                ClassName = classroom.Name + " - " + classroom.Section,

                Marks = submission.Marks,

                Status = submission.Status,

                SubmittedAt = submission.SubmittedAt
            })
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        foreach (var item in submissions)
        {
            item.StudentName = studentNames.GetValueOrDefault(
                item.StudentId,
                "Unknown");
        }

        return submissions;
    }
}