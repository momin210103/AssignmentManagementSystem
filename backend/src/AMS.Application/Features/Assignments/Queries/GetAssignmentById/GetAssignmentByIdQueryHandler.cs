using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Assignments.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Queries.GetAssignmentById;

public class GetAssignmentByIdQueryHandler
    : IRequestHandler<GetAssignmentByIdQuery, AssignmentDetailsDto?>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;

    public GetAssignmentByIdQueryHandler(
        IApplicationDbContext context,
        IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task<AssignmentDetailsDto?> Handle(
        GetAssignmentByIdQuery request,
        CancellationToken cancellationToken)
    {
        var assignment = await (
            from a in _context.Assignments.AsNoTracking()

            join classRoom in _context.ClassRooms
                on a.ClassId equals classRoom.Id

            join subject in _context.Subjects
                on a.SubjectId equals subject.Id

            where a.Id == request.Id

            select new
            {
                Assignment = a,
                ClassName = classRoom.Name,
                Section = classRoom.Section,
                SubjectName = subject.Name
            }
        ).FirstOrDefaultAsync(cancellationToken);

        if (assignment is null)
            throw new NotFoundException("Assignment not found.");

        var teacherName = await _identityService
            .GetUserNameAsync(assignment.Assignment.TeacherId);

        return new AssignmentDetailsDto
        {
            Id = assignment.Assignment.Id,
            Title = assignment.Assignment.Title,
            Description = assignment.Assignment.Description,
            Deadline = assignment.Assignment.Deadline,
            MaximumMarks = assignment.Assignment.MaximumMarks,
            Status = assignment.Assignment.Status.ToString(),
            CreatedAt = assignment.Assignment.CreatedAt,

            TeacherId = assignment.Assignment.TeacherId,
            TeacherName = teacherName,

            ClassId = assignment.Assignment.ClassId,
            ClassName = assignment.ClassName,
            Section = assignment.Section,

            SubjectId = assignment.Assignment.SubjectId,
            SubjectName = assignment.SubjectName
        };
    }
}