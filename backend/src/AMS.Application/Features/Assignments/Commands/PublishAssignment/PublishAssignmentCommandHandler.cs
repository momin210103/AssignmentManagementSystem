using AMS.Application.Common.Interfaces;
using AMS.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Commands.PublishAssignment;

public class PublishAssignmentCommandHandler : IRequestHandler<PublishAssignmentCommand, PublishAssignmentResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public PublishAssignmentCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }
    public async Task<PublishAssignmentResponse> Handle(PublishAssignmentCommand request, CancellationToken cancellationToken)
    {
        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(
                x => x.Id == request.Id, cancellationToken);
        if (assignment is null)
        {
            throw new Exception("Assignment not found");
        }

        if (assignment.TeacherId != _currentUserService.UserId)
            throw new UnauthorizedAccessException("You are not allowed to publish this assignment");
        if (assignment.Status == AssignmentStatus.Published)
            throw new Exception("Assignment is already published");
        assignment.Status = AssignmentStatus.Published;
        await _context.SaveChangesAsync(cancellationToken);
        return new PublishAssignmentResponse
        {
            Message = "Assignment published Successfully",
        };
    }
}