using AMS.Application.Features.Assignments.Commands.CreateAssignment;
using AMS.Application.Features.Assignments.Queries.GetAllAssignments;
using AMS.Application.Features.Assignments.Queries.GetAssignmentById;
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
        var command = new CreateAssignmentCommand(request);
        var result = await _mediator.Send(command);
        return Ok(result);
    }
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new GetAllAssignmentsQuery());

        return Ok(result);
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetAssignmentByIdQuery(id));

        if (result is null)
            return NotFound();

        return Ok(result);
    }

}