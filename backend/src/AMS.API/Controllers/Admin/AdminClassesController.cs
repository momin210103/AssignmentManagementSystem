using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new GetAllClassesQuery());
            return Ok(result);
        }

    }
}