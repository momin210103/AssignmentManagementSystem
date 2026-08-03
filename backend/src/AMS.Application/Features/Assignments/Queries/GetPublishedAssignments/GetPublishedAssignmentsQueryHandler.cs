using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Assignments.DTOs;
using AMS.Domain.Enums;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Queries.GetPublishedAssignments;

public class GetPublishedAssignmentsQueryHandler
    : IRequestHandler<GetPublishedAssignmentsQuery, List<AssignmentDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetPublishedAssignmentsQueryHandler(
        IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<AssignmentDto>> Handle(
        GetPublishedAssignmentsQuery request,
        CancellationToken cancellationToken)
    {
        var assignments = await _context.Assignments
            .AsNoTracking()
            .Where(x => x.Status == AssignmentStatus.Published)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<AssignmentDto>>(assignments);
    }
}