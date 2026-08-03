using AMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AMS.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Assignment> Assignments { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}