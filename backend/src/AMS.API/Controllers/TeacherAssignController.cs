using AMS.Application.Features.Teacher.Queries.GetMyTeacherAssignments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers;

[ApiController]
[Route("api/teacher/assignments")]
[Authorize(Roles = "Teacher")]
public class TeacherAssignController : ControllerBase
{
    private readonly IMediator _mediator;

    public TeacherAssignController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("options")]
    public async Task<IActionResult> GetOptions(
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(
            new GetMyTeacherAssignmentsQuery(),
            cancellationToken);

        return Ok(result);
    }
}