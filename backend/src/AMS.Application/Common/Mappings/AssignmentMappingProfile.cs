using AMS.Application.Features.Assignments.Commands.CreateAssignment;
using AMS.Application.Features.Assignments.Commands.UpdateAssignment;
using AMS.Application.Features.Assignments.DTOs;
using AMS.Domain.Entities;
using AutoMapper;

namespace AMS.Application.Common.Mappings;

public class AssignmentMappingProfile : Profile
{
    public AssignmentMappingProfile()
    {
        CreateMap<CreateAssignmentRequest, Assignment>();
        CreateMap<Assignment, AssignmentDto>()
            .ForMember(
                dest => dest.Status,
                opt => opt.MapFrom(src => src.Status.ToString()));
        CreateMap<UpdateAssignmentRequest, Assignment>();
    }
    
}