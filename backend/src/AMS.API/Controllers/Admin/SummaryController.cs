using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Features.Admin.Summaries.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMS.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/summary")]
    [Authorize(Roles = "Admin")]
    public class SummaryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SummaryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetSummary()
        {
            var query = new GetSummaryQuery();
            var summary = await _mediator.Send(query);
            return Ok(summary);
        }
    }
}