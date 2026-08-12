using AMS.Application.Features.Admin.Settings.Queries.GetSettings;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin;

[ApiController]
[Route("api/admin/settings")]
[Authorize(Roles = "Admin")]
public class AdminSettingsController : ControllerBase
{
    private readonly ISender _sender;

    public AdminSettingsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var result = await _sender.Send(
            new GetSettingsQuery());

        return Ok(result);
    }
}