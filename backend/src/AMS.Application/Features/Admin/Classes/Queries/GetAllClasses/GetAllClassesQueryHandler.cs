using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Classes.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Classes.Queries.GetAllClasses
{

    public class GetAllClassesQueryHandler : IRequestHandler<GetAllClassesQuery, List<ClassDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetAllClassesQueryHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<ClassDto>> Handle(GetAllClassesQuery request, CancellationToken cancellationToken)
        {
            var classes = await _context.ClassRooms
                .AsNoTracking()
                .OrderBy(x => x.Name)
                .ToListAsync(cancellationToken);

            var classDtos = _mapper.Map<List<ClassDto>>(classes);
            return classDtos;

        }
    }
}