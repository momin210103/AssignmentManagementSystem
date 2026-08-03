using AMS.Domain.Common;

namespace AMS.Domain.Entities;

public class StudentClass : BaseEntity
{
    public Guid StudentId { get; set; }

    public Guid ClassId { get; set; }
}