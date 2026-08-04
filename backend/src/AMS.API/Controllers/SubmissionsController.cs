using AMS.Application.Features.Submissions.Commands.CreateSubmission;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
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
}