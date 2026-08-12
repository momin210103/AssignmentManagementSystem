using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Admin.Summaries.DTOs;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace AMS.Application.Features.Admin.Summaries.Queries
{
    public class GetSummaryQueryHandler : IRequestHandler<GetSummaryQuery, SummaryDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IIdentityService _identityService;

        public GetSummaryQueryHandler(IApplicationDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }
        public async Task<SummaryDto> Handle(GetSummaryQuery request, CancellationToken cancellationToken)
        {
            var totalStudents = await _identityService.GetCountStudentAsync();
            var totalTeachers = await _identityService.GetCountTeacherAsync();
            var totalAssignments = await _context.Assignments.CountAsync(cancellationToken);
            var totalSubjects = await _context.Subjects.CountAsync(cancellationToken);
            var totalClasses = await _context.ClassRooms.CountAsync(cancellationToken);
            var totalSubmissions = await _context.Submissions.CountAsync(cancellationToken);

            return new SummaryDto
            {
                TotalStudents = totalStudents,
                TotalTeachers = totalTeachers,
                TotalAssingments = totalAssignments,
                TotalSubjects = totalSubjects,
                TotalClasses = totalClasses,
                TotalSubmissions = totalSubmissions
                
            };


        }
    }
}