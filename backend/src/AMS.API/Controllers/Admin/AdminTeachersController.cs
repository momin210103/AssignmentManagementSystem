using AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;
using AMS.Application.Features.Admin.Teachers.Commands.DeleteTeacher;
using AMS.Application.Features.Admin.Teachers.Commands.UpdateTeacher;
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
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _mediator.Send(
            new DeleteTeacherCommand(id));

        return Ok(result);
    }
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        UpdateTeacherRequest request)
    {
        var result = await _mediator.Send(
            new UpdateTeacherCommand(id, request));

        return Ok(result);
    }
}