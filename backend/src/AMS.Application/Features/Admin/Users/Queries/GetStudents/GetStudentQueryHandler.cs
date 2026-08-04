using AMS.Application.Common.Interfaces;
using MediatR;

namespace AMS.Application.Features.Admin.Users.Queries.GetStudents;

public class GetStudentsQueryHandler
    : IRequestHandler<GetStudentsQuery, List<StudentDto>>
{
    private readonly IIdentityService _identityService;

    public GetStudentsQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<List<StudentDto>> Handle(
        GetStudentsQuery request,
        CancellationToken cancellationToken)
    {
        return await _identityService.GetStudentsAsync();
    }
}