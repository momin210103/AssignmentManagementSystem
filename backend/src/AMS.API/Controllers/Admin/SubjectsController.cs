using AMS.Application.Features.Admin.Subject.Commands.CreateSubject;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin;
[ApiController]
[Route("api/admin/subjects")]
[Authorize(Roles = "Admin")]
public class SubjectsController : ControllerBase
{
    private readonly IMediator _mediator;

    public SubjectsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateSubjectRequest request)
    {
        var result = await _mediator.Send(
            new CreateSubjectCommand(request));

        return CreatedAtAction(
            nameof(Create),
            new { id = result.Id },
            result);
    }
}