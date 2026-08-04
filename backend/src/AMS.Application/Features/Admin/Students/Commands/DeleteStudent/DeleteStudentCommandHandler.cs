using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Students.Commands.DeleteStudent;

public class DeleteStudentCommandHandler
    : IRequestHandler<DeleteStudentCommand, DeleteStudentResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;

    public DeleteStudentCommandHandler(
        IApplicationDbContext context,
        IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task<DeleteStudentResponse> Handle(
        DeleteStudentCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Check if student has submissions
        var hasSubmissions = await _context.Submissions
            .AnyAsync(
                x => x.StudentId == request.StudentId,
                cancellationToken);

        if (hasSubmissions)
        {
            throw new BadRequestException(
                "Cannot delete student because submissions exist.");
        }

        // 2. Delete StudentClass mapping
        var studentClass = await _context.StudentClasses
            .FirstOrDefaultAsync(
                x => x.StudentId == request.StudentId,
                cancellationToken);

        if (studentClass is not null)
        {
            _context.StudentClasses.Remove(studentClass);
        }

        // 3. Delete Identity User
        var deleted = await _identityService.DeleteUserAsync(
            request.StudentId);

        if (!deleted)
        {
            throw new NotFoundException("Student not found.");
        }

        await _context.SaveChangesAsync(cancellationToken);

        return new DeleteStudentResponse
        {
            Message = "Student deleted successfully."
        };
    }
}