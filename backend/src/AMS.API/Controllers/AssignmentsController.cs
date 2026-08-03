using AMS.Application.Features.Assignments.Commands.CreateAssignment;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AssignmentsController : ControllerBase
{
    private readonly IMediator _mediator;
    public AssignmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = "Teacher,Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAssignmentRequest request)
    {
        var result = await _mediator.Send(request);
        return Ok(result);
    }

}