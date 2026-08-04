using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Subject.Commands.DeleteSubject;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Subjects.Commands.DeleteSubject;

public class DeleteSubjectCommandHandler
    : IRequestHandler<DeleteSubjectCommand, DeleteSubjectResponse>
{
    private readonly IApplicationDbContext _context;

    public DeleteSubjectCommandHandler(
        IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DeleteSubjectResponse> Handle(
        DeleteSubjectCommand request,
        CancellationToken cancellationToken)
    {
        var subject = await _context.Subjects
            .FirstOrDefaultAsync(
                x => x.Id == request.Id,
                cancellationToken);

        if (subject is null)
            throw new NotFoundException("Subject not found.");

        // Business Rule:
        // Subject is assigned to any assignment?
        var assignmentExists = await _context.Assignments
            .AnyAsync(
                x => x.SubjectId == request.Id,
                cancellationToken);

        if (assignmentExists)
            throw new BadRequestException(
                "This subject is already used in assignments and cannot be deleted.");

        // Business Rule:
        // Subject assigned to any teacher?
        var teacherAssigned = await _context.TeacherSubjects
            .AnyAsync(
                x => x.SubjectId == request.Id,
                cancellationToken);

        if (teacherAssigned)
            throw new BadRequestException(
                "This subject is assigned to a teacher and cannot be deleted.");

        _context.Subjects.Remove(subject);

        await _context.SaveChangesAsync(cancellationToken);

        return new DeleteSubjectResponse
        {
            Message = "Subject deleted successfully."
        };
    }
}