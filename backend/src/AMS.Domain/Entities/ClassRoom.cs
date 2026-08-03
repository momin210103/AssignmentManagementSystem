using AMS.Domain.Common;

namespace AMS.Domain.Entities;
// Class is C# keyword so I used ClassRoom 
public class ClassRoom : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string Section { get; set; } = string.Empty;
    
}