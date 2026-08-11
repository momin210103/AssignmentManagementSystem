using AMS.Application.Common.Exceptions;
using AMS.Application.Common.Interfaces;
using AMS.Application.Features.Profile.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Features.Profile.Queries.GetMyProfile;

public class GetMyProfileQueryHandler
    : IRequestHandler<GetMyProfileQuery, MyProfileDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public GetMyProfileQueryHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService,
        IIdentityService identityService)
    {
        _context = context;
        _currentUserService = currentUserService;
        _identityService = identityService;
    }

    public async Task<MyProfileDto> Handle(
        GetMyProfileQuery request,
        CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        var userName = await _identityService.GetUserNameAsync(userId);
        var role = await _identityService.GetUserRoleAsync(userId);
        var userEmail = await _identityService.GetUserEmailAsync(userId);

        if (string.IsNullOrWhiteSpace(userName))
            throw new NotFoundException("User not found.");

        if (string.IsNullOrWhiteSpace(role))
            throw new NotFoundException("User role not found.");

        if (string.IsNullOrWhiteSpace(userEmail))
            throw new NotFoundException("User email not found.");

        var profile = new MyProfileDto
        {
            Id = userId,
            FullName = userName,
            Role = role,
            Email = userEmail
        };

        // =========================
        // Student
        // =========================

        if (role == "Student")
        {
            var studentClass = await (
                from sc in _context.StudentClasses.AsNoTracking()

                join classRoom in _context.ClassRooms.AsNoTracking()
                    on sc.ClassId equals classRoom.Id

                where sc.StudentId == userId

                select new ProfileClassDto
                {
                    Id = classRoom.Id,
                    Name = classRoom.Name,
                    Section = classRoom.Section
                }
            ).FirstOrDefaultAsync(cancellationToken);

            if (studentClass is null)
                throw new NotFoundException(
                    "Student is not assigned to any class.");

            profile.Class = studentClass;

            profile.Subjects = await (
                from teacherSubject in _context.TeacherSubjects.AsNoTracking()

                join subject in _context.Subjects.AsNoTracking()
                    on teacherSubject.SubjectId equals subject.Id

                where teacherSubject.ClassId == studentClass.Id

                select new ProfileSubjectDto
                {
                    Id = subject.Id,
                    Name = subject.Name
                }
            )
            .Distinct()
            .ToListAsync(cancellationToken);
        }

        // =========================
        // Teacher
        // =========================

        else if (role == "Teacher")
        {
            profile.Classes = await (
                from teacherSubject in _context.TeacherSubjects.AsNoTracking()

                join classRoom in _context.ClassRooms.AsNoTracking()
                    on teacherSubject.ClassId equals classRoom.Id

                where teacherSubject.TeacherId == userId

                select new ProfileClassDto
                {
                    Id = classRoom.Id,
                    Name = classRoom.Name,
                    Section = classRoom.Section
                }
            )
            .Distinct()
            .ToListAsync(cancellationToken);

            profile.Subjects = await (
                from teacherSubject in _context.TeacherSubjects.AsNoTracking()

                join subject in _context.Subjects.AsNoTracking()
                    on teacherSubject.SubjectId equals subject.Id

                where teacherSubject.TeacherId == userId

                select new ProfileSubjectDto
                {
                    Id = subject.Id,
                    Name = subject.Name
                }
            )
            .Distinct()
            .ToListAsync(cancellationToken);
        }

        // =========================
        // Admin
        // =========================

        else if (role == "Admin")
        {
            // Admin has no class or subject-specific profile data.
        }

        else
        {
            throw new BadRequestException(
                $"Unsupported user role: {role}");
        }

        return profile;
    }
}