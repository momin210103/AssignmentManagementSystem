using AMS.Application.Features.Submissions.Commands.CreateSubmission;
using AMS.Application.Features.Submissions.Commands.GradeSubmission;
using AMS.Application.Features.Submissions.Commands.ResubmitSubmission;
using AMS.Application.Features.Submissions.Queries.GetAssignmentSubmissions;
using AMS.Application.Features.Submissions.Queries.GetMySubmissions;
using AMS.Application.Features.Submissions.Queries.GetMySubmissionsById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers;

[ApiController]
[Route("api/submissions")]
public class SubmissionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public SubmissionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateSubmissionRequest request)
    {
        var result = await _mediator.Send(
            new CreateSubmissionCommand(request));

        return Ok(result);
    }
    [Authorize(Roles = "Student")]
    [HttpGet("my")]
    public async Task<IActionResult> GetMySubmissions()
    {
        var result = await _mediator.Send(new GetMySubmissionsQuery());

        return Ok(result);
    }
    [Authorize(Roles = "Teacher")]
    [HttpGet("/api/assignments/{assignmentId:guid}/submissions")]
    public async Task<IActionResult> GetAssignmentSubmissions(
        Guid assignmentId)
    {
        var result = await _mediator.Send(
            new GetAssignmentSubmissionsQuery(assignmentId));

        return Ok(result);
    }
    
    [Authorize(Roles = "Teacher")]
    [HttpPatch("{submissionId:guid}/grade")]
    public async Task<IActionResult> Grade(
        Guid submissionId,
        [FromBody] GradeSubmissionRequest request)
    {
        var result = await _mediator.Send(
            new GradeSubmissionCommand(submissionId, request));

        return Ok(result);
    }
    [Authorize(Roles = "Student")]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetMySubmissionByIdQuery(id));
        return Ok(result);
    }
    [Authorize(Roles = "Student")]
    [HttpPut("{submissionId:guid}/resubmit")]
    public async Task<IActionResult> Resubmit(
        Guid submissionId,
        [FromBody] ResubmitSubmissionRequest request)
    {
        var result = await _mediator.Send(
            new ResubmitSubmissionCommand(submissionId, request));

        return Ok(result);
    }
}