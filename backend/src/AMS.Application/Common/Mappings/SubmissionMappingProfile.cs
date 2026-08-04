using AMS.Application.Features.Submissions.Commands.CreateSubmission;
using AMS.Domain.Entities;
using AutoMapper;

namespace AMS.Application.Common.Mappings;

public class SubmissionMappingProfile : Profile
{
    public SubmissionMappingProfile()
    {
        CreateMap<CreateSubmissionRequest, Submission>();
    }
}