using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Assignments.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Queries.GetAllAssignments;

public class GetAllAssignmentsQueryHandler
    : IRequestHandler<GetAllAssignmentsQuery, List<AssignmentDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAllAssignmentsQueryHandler(
        IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<AssignmentDto>> Handle(
        GetAllAssignmentsQuery request,
        CancellationToken cancellationToken)
    {
        var assignments = await _context.Assignments
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return _mapper.Map<List<AssignmentDto>>(assignments);
    }
}