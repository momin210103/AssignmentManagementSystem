using AMS.Application.Features.Admin.Submissions.Queries.GetAllSubmissions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers;

[ApiController]
[Route("api/admin/submissions")]
[Authorize(Roles = "Admin")]
public class AdminSubmissionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminSubmissionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(
            new GetAllSubmissionsQuery());

        return Ok(result);
    }
}