using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.TeacherAssign.Commands.DeleteTeacherAssign;

public class DeleteTeacherAssignCommandHandler
    : IRequestHandler<DeleteTeacherAssignCommand, DeleteTeacherAssignResponse>
{
    private readonly IApplicationDbContext _context;

    public DeleteTeacherAssignCommandHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DeleteTeacherAssignResponse> Handle(
        DeleteTeacherAssignCommand request,
        CancellationToken cancellationToken)
    {
        var teacherAssign = await _context.TeacherSubjects
            .FirstOrDefaultAsync(
                x => x.Id == request.Id,
                cancellationToken);

        if (teacherAssign is null)
            throw new NotFoundException("Teacher assignment not found.");

        _context.TeacherSubjects.Remove(teacherAssign);

        await _context.SaveChangesAsync(cancellationToken);

        return new DeleteTeacherAssignResponse
        {
            Message = "Teacher assignment deleted successfully."
        };
    }
}