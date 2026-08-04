using AMS.Application.Features.Admin.Subject.Commands.CreateSubject;
using AMS.Application.Features.Admin.Subject.DTOs;
using AMS.Domain.Entities;
using AutoMapper;

namespace AMS.Application.Common.Mappings;

public class SubjectMappingProfile : Profile
{
    public SubjectMappingProfile()
    {
        CreateMap<CreateSubjectRequest, Subject>();

        CreateMap<Subject, SubjectDto>();
    }
}