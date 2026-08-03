using AMS.Application.Common.Interfaces;
using AMS.Domain.Entities;
using AMS.Domain.Enums;
using AutoMapper;
using MediatR;

namespace AMS.Application.Features.Assignments.Commands.CreateAssignment;

public class CreateAssignmentCommandHandler : IRequestHandler<CreateAssignmentCommand, CreateAssignmentResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    
    public CreateAssignmentCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    

    public async Task<CreateAssignmentResponse> Handle(CreateAssignmentCommand request, CancellationToken cancellationToken)
    {
        var assignment = _mapper.Map<Assignment>(request.Request);
        
        assignment.TeacherId = _currentUserService.UserId;
        assignment.Status = AssignmentStatus.Draft;
        assignment.CreatedAt = DateTime.UtcNow;

        await _context.Assignments.AddAsync(assignment, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return new CreateAssignmentResponse
        {
            AssignmentId = assignment.Id,
            Message = "Assignment created successfully."
        };
    }
}