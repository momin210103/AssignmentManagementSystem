using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Features.Admin.Summaries.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.Summaries.Queries
{
    public record GetSummaryQuery : IRequest<SummaryDto>;
}