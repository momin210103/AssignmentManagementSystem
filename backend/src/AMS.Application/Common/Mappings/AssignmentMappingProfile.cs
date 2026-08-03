using AMS.Application.Features.Assignments.Commands.CreateAssignment;
using AMS.Domain.Entities;
using AutoMapper;

namespace AMS.Application.Common.Mappings;

public class AssignmentMappingProfile : Profile
{
    public AssignmentMappingProfile()
    {
        CreateMap<CreateAssignmentRequest, Assignment>();
    }
    
}