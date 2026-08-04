using AMS.Application.Features.Admin.Assignments.Queries.GetAllAssignments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin;
[ApiController]
[Route("api/admin/assignments")]
[Authorize(Roles = "Admin")]
public class AssignmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AssignmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(
            new GetAllAdminAssignmentsQuery());

        return Ok(result);
    }
}