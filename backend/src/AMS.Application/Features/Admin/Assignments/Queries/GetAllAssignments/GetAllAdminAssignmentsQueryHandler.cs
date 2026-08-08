using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Assignments.DTOs;
using AMS.Application.Features.Admin.Assignments.Queries.GetAllAssignments;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Assignments.Queries.GetAllAdminAssignments;

public class GetAllAdminAssignmentsQueryHandler
    : IRequestHandler<GetAllAdminAssignmentsQuery, List<AdminAssignmentDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;

    public GetAllAdminAssignmentsQueryHandler(
        IApplicationDbContext context,
        IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task<List<AdminAssignmentDto>> Handle(
        GetAllAdminAssignmentsQuery request,
        CancellationToken cancellationToken)
    {
        // Get all teacher names
        var teacherNames = await _identityService.GetTeacherNamesAsync();

        // Get assignments
        var assignments = await (
            from assignment in _context.Assignments
            join classroom in _context.ClassRooms
                on assignment.ClassId equals classroom.Id
            join subject in _context.Subjects
                on assignment.SubjectId equals subject.Id

            orderby assignment.CreatedAt descending

            select new AdminAssignmentDto
            {
                Id = assignment.Id,
                Title = assignment.Title,

                TeacherId = assignment.TeacherId,

                ClassName = classroom.Name + " - " + classroom.Section,
                ClassId = classroom.Id,
                SubjectId = subject.Id,
                SubjectName = subject.Name,
                Status = assignment.Status,
                Deadline = assignment.Deadline
            })
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        // Populate teacher names
        foreach (var item in assignments)
        {
            item.TeacherName = teacherNames.GetValueOrDefault(
                item.TeacherId,
                "Unknown");
        }

        return assignments;
    }
}