using AMS.Application.Features.Admin.Settings.DTOs;
using MediatR;

namespace AMS.Application.Features.Admin.Settings.Queries.GetSettings;

public sealed record GetSettingsQuery
    : IRequest<ApplicationSettingsDto>;