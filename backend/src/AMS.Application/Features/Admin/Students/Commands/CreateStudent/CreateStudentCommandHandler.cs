using AMS.Application.Common.Interfaces;
using AMS.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Admin.Students.Commands.CreateStudent;

public class CreateStudentCommandHandler
    : IRequestHandler<CreateStudentCommand, CreateStudentResponse>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;

    public CreateStudentCommandHandler(
        IApplicationDbContext context,
        IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task<CreateStudentResponse> Handle(
        CreateStudentCommand request,
        CancellationToken cancellationToken)
    {
        // 1. Check class exists
        var classroom = await _context.ClassRooms
            .FirstOrDefaultAsync(
                x => x.Id == request.Request.ClassId,
                cancellationToken);

        if (classroom is null)
            throw new Exception("Class not found.");

        // 2. Create student account
        var result = await _identityService.CreateStudentAsync(
            request.Request.FullName,
            request.Request.Email,
            request.Request.Password);

        if (!result.Succeeded)
        {
            throw new Exception(string.Join(", ", result.Errors));
        }

        // 3. Assign student to class
        var studentClass = new StudentClass
        {
            StudentId = result.UserId!.Value,
            ClassId = request.Request.ClassId
        };

        await _context.StudentClasses.AddAsync(
            studentClass,
            cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        // 4. Return response
        return new CreateStudentResponse
        {
            StudentId = result.UserId.Value,
            Message = "Student created successfully."
        };
    }
}