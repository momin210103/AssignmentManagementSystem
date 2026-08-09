using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Queries.GetStudentAssignments;

public class GetStudentAssignmentsQueryHandler
    : IRequestHandler<
        GetStudentAssignmentsQuery,
        List<GetStudentAssignmentsResponse>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public GetStudentAssignmentsQueryHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<List<GetStudentAssignmentsResponse>> Handle(
        GetStudentAssignmentsQuery request,
        CancellationToken cancellationToken)
    {
        var studentId = _currentUserService.UserId;

        var classId = await _context.StudentClasses
            .Where(x => x.StudentId == studentId)
            .Select(x => x.ClassId)
            .FirstOrDefaultAsync(cancellationToken);

        if (classId == Guid.Empty)
        {
            throw new BadRequestException("You are not enrolled in any class.");
        }

        return await _context.Assignments
            .AsNoTracking()
            .Where(x =>
                x.ClassId == classId &&
                x.Status == AssignmentStatus.Published)
            .OrderBy(x => x.Deadline)
            .Select(x => new GetStudentAssignmentsResponse
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description ?? string.Empty,
                Deadline = x.Deadline,
                MaximumMarks = x.MaximumMarks,
                Status = x.Status.ToString(),
                ClassId = x.ClassId,
                SubjectId = x.SubjectId,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync(cancellationToken);
    }
}