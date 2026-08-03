using MediatR;

namespace AMS.Application.Features.Authentication.Commands.Register;

public sealed record RegisterCommand(RegisterRequest Request) : IRequest<RegisterResponse>;

    
