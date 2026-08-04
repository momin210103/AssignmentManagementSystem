using AMS.Application.Features.Admin.TeacherAssign.Commands.CreateTeacherAssign;
using AMS.Application.Features.Admin.TeacherAssign.Queries.GetAllTeacherAssign;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin;
[ApiController]
[Route("api/admin/teacher-assign")]
[Authorize(Roles = "Admin")]
public class TeacherAssignController: ControllerBase
{
    private readonly IMediator _mediator;

    public TeacherAssignController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateTeacherAssignRequest request)
    {
        var result = await _mediator.Send(
            new CreateTeacherAssignCommand(request));

        return CreatedAtAction(
            nameof(Create),
            new { id = result.Id },
            result);
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(
            new GetAllTeacherAssignQuery());

        return Ok(result);
    }
}