using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Students.Commands.UpdateStudent;

public class UpdateStudentCommandHandler : IRequestHandler<UpdateStudentCommand,UpdateStudentResponse>
{
    private readonly IIdentityService _identityService;
    private readonly IApplicationDbContext _context;
    

    public UpdateStudentCommandHandler(IIdentityService identityService, IApplicationDbContext context)
    {
        _identityService = identityService;
        _context = context;
        
    }
    
    
    public async Task<UpdateStudentResponse> Handle(UpdateStudentCommand request, CancellationToken cancellationToken)
    {
        // StudentClass exists?
        var studentClass = await _context.StudentClasses
            .FirstOrDefaultAsync(
                x => x.StudentId == request.Id,
                cancellationToken);

        if (studentClass is null)
        {
            throw new NotFoundException("Student not found.");
        }

        // Class exists?
        var classroomExists = await _context.ClassRooms
            .AnyAsync(
                x => x.Id == request.Request.ClassId,
                cancellationToken);

        if (!classroomExists)
        {
            throw new NotFoundException("Class not found.");
        }

        // Update AspNetUsers
        await _identityService.UpdateStudentAsync(
            request.Id,
            request.Request.FullName,
            request.Request.Email);

        // Update StudentClass
        studentClass.ClassId = request.Request.ClassId;

        await _context.SaveChangesAsync(cancellationToken);

        return new UpdateStudentResponse
        {
            StudentId = request.Id,
            Message = "Student updated successfully."
        };
    }
}