using AMS.Application.Common.Interfaces;
using AMS.Domain.Entities;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Commands.UpdateAssignment;

public class UpdateAssignmentCommandHandler
    : IRequestHandler<UpdateAssignmentCommand, UpdateAssignmentResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public UpdateAssignmentCommandHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<UpdateAssignmentResponse> Handle(
        UpdateAssignmentCommand request,
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

        // Teacher can update only own assignment
        if (assignment.TeacherId != _currentUserService.UserId)
        {
            throw new UnauthorizedAccessException(
                "You are not allowed to update this assignment.");
        }

        _mapper.Map(request.Request, assignment);

        await _context.SaveChangesAsync(cancellationToken);

        return new UpdateAssignmentResponse
        {
            Message = "Assignment updated successfully."
        };
    }
}