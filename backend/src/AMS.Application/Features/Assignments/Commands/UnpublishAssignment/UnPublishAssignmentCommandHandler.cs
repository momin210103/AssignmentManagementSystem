using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Commands.UnpublishAssignment;

public class UnPublishAssignmentCommandHandler : IRequestHandler<UnPublishAssignmentCommand, UnPublishAssignmentResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public UnPublishAssignmentCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
        
    }
    public async Task<UnPublishAssignmentResponse> Handle(UnPublishAssignmentCommand request, CancellationToken cancellationToken)
    {
        var assignment = await _context.Assignments
            .FirstOrDefaultAsync(x => x.Id == request.Id);
        if (assignment is null)
        {
            throw new NotFoundException("Assignment not found");
        }

        if (assignment.TeacherId != _currentUserService.UserId)
        {
            throw new ForbiddenException("You are not allowed to Unpublish assignment");
        }

        if (assignment.Status == AssignmentStatus.Draft)
        {
            throw new BadRequestException("Assignment is draft");
        }

        assignment.Status = AssignmentStatus.Draft;
        await _context.SaveChangesAsync(cancellationToken);
        return new UnPublishAssignmentResponse
        {
            Message = "Assignment draft Successfully",
        };
    }
}