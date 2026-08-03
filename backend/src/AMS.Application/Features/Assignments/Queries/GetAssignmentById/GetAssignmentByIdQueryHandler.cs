using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Assignments.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Assignments.Queries.GetAssignmentById;

public class GetAssignmentByIdQueryHandler
    : IRequestHandler<GetAssignmentByIdQuery, AssignmentDto?>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetAssignmentByIdQueryHandler(
        IApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<AssignmentDto?> Handle(
        GetAssignmentByIdQuery request,
        CancellationToken cancellationToken)
    {
        var assignment = await _context.Assignments
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Id == request.Id,
                cancellationToken);

        if (assignment is null)
            return null;

        return _mapper.Map<AssignmentDto>(assignment);
    }
}