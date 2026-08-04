using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;

namespace AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;

public class CreateTeacherCommandHandler
    : IRequestHandler<CreateTeacherCommand, CreateTeacherResponse>
{
    private readonly IIdentityService _identityService;

    public CreateTeacherCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<CreateTeacherResponse> Handle(
        CreateTeacherCommand request,
        CancellationToken cancellationToken)
    {
        var result = await _identityService.CreateTeacherAsync(
            request.Request.FullName,
            request.Request.Email,
            request.Request.Password);

        if (!result.Succeeded)
        {
            throw new BadRequestException(string.Join(", ", result.Errors));
        }

        return new CreateTeacherResponse
        {
            TeacherId = result.UserId!.Value,
            Message = "Teacher created successfully."
        };
    }
}