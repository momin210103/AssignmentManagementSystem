using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Submissions.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Submissions.Queries.GetMySubmissionsById;

public class GetMySubmissionByIdQueryHandler : IRequestHandler<GetMySubmissionByIdQuery, SubmissionDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetMySubmissionByIdQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
    {
        _context = context;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }



    public async Task<SubmissionDto> Handle(GetMySubmissionByIdQuery request, CancellationToken cancellationToken)
    {
        var submission = await _context.Submissions
            .AsNoTracking()
            .Include(x => x.Assignment)
            .FirstOrDefaultAsync(
                x => x.Id == request.Id &&
                     x.StudentId == _currentUserService.UserId,
                cancellationToken);
        if (submission is null)
            throw new NotFoundException("Submission Not found");
        return _mapper.Map<SubmissionDto>(submission);
    }
}