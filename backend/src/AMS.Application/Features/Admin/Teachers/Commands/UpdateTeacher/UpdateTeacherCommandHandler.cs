using AMS.Application.Common.Interfaces;
using MediatR;

namespace AMS.Application.Features.Admin.Teachers.Commands.UpdateTeacher;

public class UpdateTeacherCommandHandler : IRequestHandler<UpdateTeacherCommand,UpdateTeacherResponse>
{
    private readonly IIdentityService _identityService;
    public UpdateTeacherCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }
    public async Task<UpdateTeacherResponse> Handle(UpdateTeacherCommand request, CancellationToken cancellationToken)
    {
        await _identityService.UpdateTeacherAsync(
            request.Id,
            request.Request.FullName,
            request.Request.Email);

        return new UpdateTeacherResponse
        {
            TeacherId = request.Id,
            Message = "Teacher updated successfully."
        };
    }
}