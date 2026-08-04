using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.TeacherAssign.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.TeacherAssign.Queries.GetAllTeacherAssign;

public class GetAllTeacherAssignQueryHandler
    : IRequestHandler<GetAllTeacherAssignQuery, List<TeacherAssignDto>>
{
    private readonly IApplicationDbContext _context;

    public GetAllTeacherAssignQueryHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<TeacherAssignDto>> Handle(
        GetAllTeacherAssignQuery request,
        CancellationToken cancellationToken)
    {
        var teacherAssigns = await (
                from ts in _context.TeacherSubjects
                join classroom in _context.ClassRooms
                    on ts.ClassId equals classroom.Id
                join subject in _context.Subjects
                    on ts.SubjectId equals subject.Id

                orderby classroom.Name

                select new TeacherAssignDto
                {
                    Id = ts.Id,

                    TeacherId = ts.TeacherId,

                    ClassId = classroom.Id,
                    ClassName = classroom.Name + " - " + classroom.Section,

                    SubjectId = subject.Id,
                    SubjectName = subject.Name
                })
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return teacherAssigns;
        
    }
}