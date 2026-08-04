using AMS.Application.Features.Admin.Students.Commands.CreateStudent;
using AMS.Application.Features.Admin.Students.Commands.DeleteStudent;
using AMS.Application.Features.Admin.Teachers.Commands.CreateTeacher;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin;

[ApiController]
[Route("api/admin/students")]
[Authorize(Roles = "Admin")]
public class AdminStudentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public AdminStudentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateStudentRequest request)
    {
        var result = await _mediator.Send(
            new CreateStudentCommand(request));

        return Ok(result);
    }
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _mediator.Send(
            new DeleteStudentCommand(id));

        return Ok(result);
    }
}