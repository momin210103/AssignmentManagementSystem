using AMS.Application.Features.Admin.TeacherAssign.Commands.CreateTeacherAssign;
using AMS.Application.Features.Admin.TeacherAssign.DTOs;
using AMS.Domain.Entities;
using AutoMapper;

namespace AMS.Application.Common.Mappings;

public class TeacherAssignMappingProfile : Profile
{
    public TeacherAssignMappingProfile()
    {
        CreateMap<CreateTeacherAssignRequest, TeacherSubject>();
        CreateMap<TeacherSubject, TeacherAssignDto>();
    }
}