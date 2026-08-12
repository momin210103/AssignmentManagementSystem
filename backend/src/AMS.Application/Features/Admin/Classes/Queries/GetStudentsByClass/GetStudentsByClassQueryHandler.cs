using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Users.Queries.GetStudents;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Classes.Queries.GetStudentsByClass
{
    public class GetStudentsByClassQueryHandler : IRequestHandler<GetStudentsByClassQuery, List<StudentDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;

        public GetStudentsByClassQueryHandler(IApplicationDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<List<StudentDto>> Handle(GetStudentsByClassQuery request, CancellationToken cancellationToken)
        {
            // Implement the logic to retrieve students by class from the database using the provided ClassId
            // For demonstration purposes, returning an empty list
            //? Class Find

            // 1. Check class exists
            var classRoom = await _context.ClassRooms
                .AsNoTracking()
                .FirstOrDefaultAsync(
                    x => x.Id == request.ClassId,
                    cancellationToken);

            if (classRoom is null)
                throw new NotFoundException("Class not found.");

            // 2. Get students assigned to this class
            var studentIds = await _context.StudentClasses
                .AsNoTracking()
                .Where(x => x.ClassId == request.ClassId)
                .Select(x => x.StudentId)
                .ToListAsync(cancellationToken);

            // 3. Get all students from Identity
            //! EnEfficient, but we don't have a better way to get students by Ids from IdentityService
            var students = await _identityService.GetStudentsAsync();

            // 4. Keep only students belonging to this class
            return students
                .Where(x => studentIds.Contains(x.Id))
                .ToList();
        }
    }
}