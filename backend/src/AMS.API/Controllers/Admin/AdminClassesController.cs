using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Features.Admin.Classes.Commands.CreateClassCommands;
using AMS.Application.Features.Admin.Classes.Queries.GetAllClasses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/classes")]
    [Authorize(Roles = "Admin")]
    public class AdminClassesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AdminClassesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        // Create a new class
        // POST: api/admin/classes
        [HttpPost()]
        public async Task<IActionResult> CreateClass([FromBody] CreateClassRequest request)
        {
            var command = new CreateClassCommand(request);
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllClassesQuery());
            return Ok(result);
        }

    }
}