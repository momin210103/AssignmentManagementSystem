using AMS.Application.Common.Interfaces;
using MediatR;

namespace AMS.Application.Features.Admin.Users.Queries.GetTeachers;

public class GetTeachersQueryHandler
    : IRequestHandler<GetTeachersQuery, List<TeacherDto>>
{
    private readonly IIdentityService _identityService;

    public GetTeachersQueryHandler(
        IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<List<TeacherDto>> Handle(
        GetTeachersQuery request,
        CancellationToken cancellationToken)
    {
        return await _identityService.GetTeachersAsync();
    }
}