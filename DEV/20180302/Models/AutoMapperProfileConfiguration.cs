using AutoMapper;
using AspNetCoreWebAPI.Entities;
using System.Collections.Generic;

namespace AspNetCoreWebAPI.Models
{ 

public class AutoMapperProfileConfiguration : Profile
{

        public AutoMapperProfileConfiguration()
        {


            CreateMap<Survey, SurveyDTO>();
            CreateMap<SurveyDTO, Survey>();

            // William Thompson

            // Use CreateMap... Etc.. here (Profile methods are the same as configuration methods)

            CreateMap<SurveyQuestionDetail, SurveyQuestionDetailDTO>();
            CreateMap<SurveyQuestionDetailDTO, SurveyQuestionDetail>();

            CreateMap<IEnumerable<SurveyQuestion>, SurveyQuestionDTO>();
            CreateMap<SurveyQuestionDTO, IEnumerable<SurveyQuestion>>();

        }

        //public AutoMapperProfileConfiguration()
        //: this("MyProfile")
        //{
        //}
        //protected AutoMapperProfileConfiguration(string profileName)
        //: base(profileName)
        //{
        //    //CreateMap<Entities.Book, Models.BookDTO>();
        //    //CreateMap<Models.BookDTO, Entities.Book>();
        //    //CreateMap<Entities.Publisher, Models.PublisherDTO>();
        //    //CreateMap<Models.PublisherDTO, Entities.Publisher>();
        //    //CreateMap<Models.PublisherUpdateDTO, Entities.Publisher>();
        //    //CreateMap<Entities.Publisher, Models.PublisherUpdateDTO>();
        //    //CreateMap<Models.BookUpdateDTO, Entities.Book>();
        //    //CreateMap<Entities.Book, Models.BookUpdateDTO>();

        //    CreateMap<Entities.Survey, Models.SurveyDTO>();
        //    CreateMap<Models.SurveyDTO, Entities.Survey>();

        //    // William Thompson
        //    CreateMap<User, UserDTO>();
        //    CreateMap<UserDTO, User>();
        //}
    }
}
