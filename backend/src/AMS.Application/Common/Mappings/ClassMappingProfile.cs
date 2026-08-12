using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMS.Application.Features.Admin.Classes.Commands.CreateClassCommands;
using AMS.Application.Features.Admin.Classes.DTOs;
using AMS.Domain.Entities;
using AutoMapper;

namespace AMS.Application.Common.Mappings
{
    public class ClassMappingProfile : Profile
    {
        public ClassMappingProfile()
        {
            CreateMap<ClassRoom, ClassDto>();
            CreateMap<CreateClassRequest, ClassRoom>();
        }
        
    }
}