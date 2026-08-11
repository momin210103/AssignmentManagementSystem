using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Features.Profile.DTOs;
using MediatR;

namespace AMS.Application.Features.Profile.Queries.GetMyProfile
{
    public record GetMyProfileQuery() : IRequest<MyProfileDto>;

}