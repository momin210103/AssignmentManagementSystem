using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Submissions.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Submissions.Queries.GetMySubmissions;

public class GetMySubmissionsQueryHandler : IRequestHandler<GetMySubmissionsQuery, List<SubmissionDto>>
{
    private readonly IMapper _mapper;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    
    public GetMySubmissionsQueryHandler(IMapper mapper, IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _mapper = mapper;
        _context = context;
        _currentUserService = currentUserService;
    }

   
    
    public async  Task<List<SubmissionDto>> Handle(GetMySubmissionsQuery request, CancellationToken cancellationToken)
    {
        var submissions = await _context.Submissions
            .AsNoTracking()
            .Where(x => x.StudentId == _currentUserService.UserId)
            .OrderByDescending(x => x.SubmittedAt)
            .ToListAsync(cancellationToken);
        return _mapper.Map<List<SubmissionDto>>(submissions);
    }
}