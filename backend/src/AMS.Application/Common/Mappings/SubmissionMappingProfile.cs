using AMS.Application.Features.Submissions.Commands.CreateSubmission;
using AMS.Application.Features.Submissions.DTOs;
using AMS.Domain.Entities;
using AutoMapper;

namespace AMS.Application.Common.Mappings;

public class SubmissionMappingProfile : Profile
{
    public SubmissionMappingProfile()
    {
        CreateMap<CreateSubmissionRequest, Submission>();
        
        CreateMap<Submission, SubmissionDto>()
            .ForMember(
                dest => dest.Status,
                opt => opt.MapFrom(src => src.Status.ToString()));
    }
}