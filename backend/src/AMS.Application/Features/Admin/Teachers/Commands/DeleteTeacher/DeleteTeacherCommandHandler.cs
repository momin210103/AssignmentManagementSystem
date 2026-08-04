using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Teachers.Commands.DeleteTeacher;

public class DeleteTeacherCommandHandler
    : IRequestHandler<DeleteTeacherCommand, DeleteTeacherResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;

    public DeleteTeacherCommandHandler(
        IApplicationDbContext context,
        IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task<DeleteTeacherResponse> Handle(
        DeleteTeacherCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Teacher has assignments?
        var hasAssignments = await _context.Assignments
            .AnyAsync(x => x.TeacherId == request.TeacherId,
                cancellationToken);

        if (hasAssignments)
        {
            throw new BadRequestException(
                "Cannot delete teacher because assignments exist.");
        }

        // 2. Delete teacher assignments (TeacherSubject mappings)
        var teacherSubjects = await _context.TeacherSubjects
            .Where(x => x.TeacherId == request.TeacherId)
            .ToListAsync(cancellationToken);

        if (teacherSubjects.Any())
        {
            _context.TeacherSubjects.RemoveRange(teacherSubjects);
        }

        // 3. Delete identity user
        var deleted = await _identityService.DeleteUserAsync(
            request.TeacherId);

        if (!deleted)
        {
            throw new NotFoundException("Teacher not found.");
        }

        await _context.SaveChangesAsync(cancellationToken);

        return new DeleteTeacherResponse
        {
            Message = "Teacher deleted successfully."
        };
    }
}