using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Subject.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Subject.Queries.GetAllSubjects;

public class GetAllSubjectsQueryHandler : IRequestHandler<GetAllSubjectsQuery, List<SubjectDto>>
{

    private readonly IMapper _mapper;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    public GetAllSubjectsQueryHandler(IMapper mapper, IApplicationDbContext context, ICurrentUserService currentUserService)
    {
        _mapper = mapper;
        _context = context;
        _currentUserService = currentUserService;
    }
    
    public async Task<List<SubjectDto>> Handle(GetAllSubjectsQuery request, CancellationToken cancellationToken)
    {
        var subject = await _context.Subjects
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);
        var subjectDtos = _mapper.Map<List<SubjectDto>>(subject);
        return subjectDtos;
    }
}

