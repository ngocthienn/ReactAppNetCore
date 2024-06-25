using System.Runtime.InteropServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ReactAppNetCore.Server.DTOs;
using ReactAppNetCore.Server.Models;

namespace ReactAppNetCore.Server.Helpers
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper() 
        {
            CreateMap<Template, TemplateDTO>().ReverseMap();
            CreateMap<Answer, AnswerDTO>().ReverseMap();
            CreateMap<Control, ControlDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}