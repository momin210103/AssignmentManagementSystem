using AMS.Application.Features.Assignments.Commands.CreateAssignment;
using AMS.Application.Features.Assignments.Commands.DeleteAssignment;
using AMS.Application.Features.Assignments.Commands.PublishAssignment;
using AMS.Application.Features.Assignments.Commands.UnpublishAssignment;
using AMS.Application.Features.Assignments.Commands.UpdateAssignment;
using AMS.Application.Features.Assignments.Queries.GetAllAssignments;
using AMS.Application.Features.Assignments.Queries.GetAssignmentById;
using AMS.Application.Features.Assignments.Queries.GetMyAssignments;
using AMS.Application.Features.Assignments.Queries.GetPublishedAssignments;
using AMS.Application.Features.Submissions.Queries.GetMySubmissionsById;
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
    [Authorize(Roles = "Teacher,Admin")]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] UpdateAssignmentRequest request)
    {
        var result = await _mediator.Send(
            new UpdateAssignmentCommand(id, request));

        return Ok(result);
    }
    [Authorize(Roles = "Teacher,Admin")]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _mediator.Send(new DeleteAssignmentCommand(id));

        return Ok(result);
    }

    [Authorize(Roles = "Teacher,Admin")]
    [HttpPatch("{id:guid}/publish")]
    public async Task<IActionResult> Publish(Guid id)
    {
        var result = await _mediator.Send(new PublishAssignmentCommand(id));
        return Ok(result);
    }

    [Authorize(Roles = "Teacher,Admin")]
    [HttpPatch("{id:guid}/unpublish")]
    public async Task<IActionResult> Unpublish(Guid id)
    {
        var result = await _mediator.Send(new UnPublishAssignmentCommand(id));
        return Ok(result);
    }
    [Authorize]
    [HttpGet("published")]
    public async Task<IActionResult> GetPublishedAssignments()
    {
        var result = await _mediator.Send(new GetPublishedAssignmentsQuery());

        return Ok(result);
    }
    [Authorize(Roles = "Teacher")]
    [HttpGet("my")]
    public async Task<IActionResult> GetMyAssignments()
    {
        var result = await _mediator.Send(new GetMyAssignmentsQuery());

        return Ok(result);
    }

    

}