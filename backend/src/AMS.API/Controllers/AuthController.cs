using AMS.Application.Features.Authentication.Commands.Login;
using AMS.Application.Features.Authentication.Commands.RefreshToken;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ISender _sender;

    public AuthController(ISender sender)
    {
        _sender = sender;
    }


    /*[HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _sender.Send(new RegisterCommand(request));

        return Ok(result);
    }*/


    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _sender.Send(new LoginCommand(request));

        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh(
    [FromBody] RefreshTokenCommand command)
    {
        var result = await _sender.Send(command);

        return Ok(result);
    }

}