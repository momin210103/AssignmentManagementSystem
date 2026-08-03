using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Assignments.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Queries.GetMyAssignments;

public class GetMyAssignmentsQueryHandler
    : IRequestHandler<GetMyAssignmentsQuery, List<AssignmentDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public GetMyAssignmentsQueryHandler(
        IApplicationDbContext context,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    public async Task<List<AssignmentDto>> Handle(
        GetMyAssignmentsQuery request,
        CancellationToken cancellationToken)
    {
        var assignments = await _context.Assignments
            .AsNoTracking()
            .Where(x => x.TeacherId == _currentUserService.UserId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<AssignmentDto>>(assignments);
    }
}