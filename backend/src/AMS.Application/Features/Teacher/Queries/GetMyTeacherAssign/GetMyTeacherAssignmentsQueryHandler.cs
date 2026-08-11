using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Teacher.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Teacher.Queries.GetMyTeacherAssignments;

public class GetMyTeacherAssignmentsQueryHandler
    : IRequestHandler<
        GetMyTeacherAssignmentsQuery,
        List<TeacherAssignmentOptionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public GetMyTeacherAssignmentsQueryHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<List<TeacherAssignmentOptionDto>> Handle(
        GetMyTeacherAssignmentsQuery request,
        CancellationToken cancellationToken)
    {
        var teacherId = _currentUserService.UserId;

        var assignments = await (
            from teacherSubject in _context.TeacherSubjects

            join classroom in _context.ClassRooms
                on teacherSubject.ClassId equals classroom.Id

            join subject in _context.Subjects
                on teacherSubject.SubjectId equals subject.Id

            where teacherSubject.TeacherId == teacherId

            orderby classroom.Name,
                    classroom.Section,
                    subject.Name

            select new TeacherAssignmentOptionDto
            {
                ClassId = classroom.Id,
                ClassName = classroom.Name + " - " + classroom.Section,

                SubjectId = subject.Id,
                SubjectName = subject.Name
            })
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return assignments;
    }
}