using AMS.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Commands.DeleteAssignment;

public class DeleteAssignmentCommandHandler
    : IRequestHandler<DeleteAssignmentCommand, DeleteAssignmentResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public DeleteAssignmentCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<DeleteAssignmentResponse> Handle(
        DeleteAssignmentCommand request,
        CancellationToken cancellationToken)
    {
        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(
                x => x.Id == request.Id,
                cancellationToken);

        if (assignment is null)
        {
            throw new Exception("Assignment not found.");
        }

        if (assignment.TeacherId != _currentUserService.UserId)
        {
            throw new UnauthorizedAccessException(
                "You are not allowed to delete this assignment.");
        }

        _context.Assignments.Remove(assignment);

        await _context.SaveChangesAsync(cancellationToken);

        return new DeleteAssignmentResponse
        {
            Message = "Assignment deleted successfully."
        };
    }
}