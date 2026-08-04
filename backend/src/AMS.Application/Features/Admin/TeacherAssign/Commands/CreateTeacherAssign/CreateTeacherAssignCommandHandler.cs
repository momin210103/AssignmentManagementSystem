using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Domain.Entities;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.TeacherAssign.Commands.CreateTeacherAssign;

public class CreateTeacherAssignCommandHandler : IRequestHandler<CreateTeacherAssignCommand, CreateTeacherAssignResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly IMapper _mapper;
    public CreateTeacherAssignCommandHandler(
        IApplicationDbContext context,
       IIdentityService identityService,
        IMapper mapper)
    {
        _context = context;
        _identityService = identityService;
        _mapper = mapper;
    }
    public async Task<CreateTeacherAssignResponse> Handle(CreateTeacherAssignCommand request, CancellationToken cancellationToken)
    {
        //1. Teacher Exists?
        var isTeacher = await _identityService.IsTeacherAsync(request.Request.TeacherId);
        if (!isTeacher)
            throw new NotFoundException("Selected user is not a teacher");
        // 3. Class exists?
        var classExists = await _context.ClassRooms
            .AnyAsync(
                x => x.Id == request.Request.ClassId,
                cancellationToken);

        if (!classExists)
            throw new NotFoundException("Class not found.");

        // 4. Subject exists?
        var subjectExists = await _context.Subjects
            .AnyAsync(
                x => x.Id == request.Request.SubjectId,
                cancellationToken);

        if (!subjectExists)
            throw new NotFoundException("Subject not found.");

        // 5. Duplicate mapping?
        var alreadyAssigned = await _context.TeacherSubjects
            .AnyAsync(
                x => x.TeacherId == request.Request.TeacherId &&
                     x.ClassId == request.Request.ClassId &&
                     x.SubjectId == request.Request.SubjectId,
                cancellationToken);

        if (alreadyAssigned)
            throw new BadRequestException(
                "This teacher is already assigned to this class and subject.");

        // 6. Create mapping
        var teacherAssign =
            _mapper.Map<TeacherSubject>(request.Request);

        teacherAssign.Id = Guid.NewGuid();

        await _context.TeacherSubjects.AddAsync(
            teacherAssign,
            cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return new CreateTeacherAssignResponse
        {
            Id = teacherAssign.Id,
            Message = "Teacher assigned successfully."
        };
        
    }
}