using AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin;

[ApiController]
[Route("api/admin/teachers")]
[Authorize(Roles = "Admin")]
public class AdminTeachersController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminTeachersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateTeacherRequest request)
    {
        var result = await _mediator.Send(
            new CreateTeacherCommand(request));

        return Ok(result);
    }
}