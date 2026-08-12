using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AutoMapper;
using MediatR;

namespace AMS.Application.Features.Admin.Classes.Commands.CreateClassCommands
{
    public class CreateClassCommandHandler : IRequestHandler<CreateClassCommand, CreateClassResponse>
    {
        // Dependencies
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;

        private readonly ICurrentUserService _currentUserService;

        private readonly IMapper _mapper;

        public CreateClassCommandHandler(
            IApplicationDbContext context,
            IIdentityService identityService,
            ICurrentUserService currentUserService,
            IMapper mapper)
        {
            _context = context;
            _identityService = identityService;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }
        // Implement the handler logic here
        public async Task<CreateClassResponse> Handle(CreateClassCommand request, CancellationToken cancellationToken)
        {

            //? 1. Create Class Exists ?
            var classExists = _context.ClassRooms
                .Any(x => x.Name == request.Request.Name && x.Section == request.Request.Section);
            if (classExists)
                throw new BadRequestException("Class with the same name and section already exists.");

            //? 2. isAdmin ?
            var isAdmin = _currentUserService.IsInRole("Admin");
            if (!isAdmin)
                throw new BadRequestException("User is not an admin.");

            //? 3. Create Class
            var newClass = _mapper.Map<Domain.Entities.ClassRoom>(request.Request);
            newClass.Id = Guid.NewGuid();

            await _context.ClassRooms.AddAsync(newClass, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new CreateClassResponse
            {
                ClassId = newClass.Id,
                Name = newClass.Name,
                Section = newClass.Section,
                Message = "Class created successfully."
            };

        }
    }
}