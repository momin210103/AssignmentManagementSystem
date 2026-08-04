using AMS.Application.Features.Admin.Users.Queries.GetTeachers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin;
[ApiController]
//[Authorize(Roles = "Admin")]
[Route("api/admin/users")]
public class UsersController :  ControllerBase
{
    private readonly IMediator _mediator;
    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpGet("teachers")]
    public async Task<IActionResult> GetTeachers()
    {
        var result = await _mediator.Send(new GetTeachersQuery());

        return Ok(result);
    }
}