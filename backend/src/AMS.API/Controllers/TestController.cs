using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet("public")]
    public IActionResult Public()
    {
        return Ok("Public Endpoint");
    }

    [Authorize]
    [HttpGet("authenticated")]
    public IActionResult Authenticated()
    {
        return Ok("Authenticated User");
    }

    [Authorize(Roles = "Student")]
    [HttpGet("student")]
    public IActionResult Student()
    {
        return Ok("Student Only");
    }

    [Authorize(Roles = "Teacher")]
    [HttpGet("teacher")]
    public IActionResult Teacher()
    {
        return Ok("Teacher Only");
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public IActionResult Admin()
    {
        return Ok("Admin Only");
    }
}