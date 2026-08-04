using AMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Assignment> Assignments { get; }
    DbSet<Submission> Submissions { get; }
    DbSet<Subject> Subjects { get; }
    DbSet<TeacherSubject> TeacherSubjects { get; }
    DbSet<ClassRoom> ClassRooms { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}