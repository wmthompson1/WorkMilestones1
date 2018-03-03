using AspNetCoreWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Data
{
    public class MockSurveyData
    {
        // Create static instance of the MocksurveyData class
        public static MockSurveyData Current { get; } = new MockSurveyData();
        public List<SurveyDTO> Surveys { get; set; }


        public MockSurveyData()
        {
            Surveys = new List<SurveyDTO>
            {

                new SurveyDTO
                {
                    Id = 2,
                    Name = "2006 Post-School Status Follow-Up Surveyxx",
                    Description = "2006 Post-School Status of Special Education Graduates, 2006 Follow-up Study Telephone Survey, Seattle University",
                    SurveyTypeCode = "postschool",
                    Instructions = "test",
                    IsLocked = true,
                    CloseDate = new DateTime(2007 - 07 - 01),
                    CreateDate = new DateTime(2007 - 07 - 01),
                    CreatedBy = "admin",
                    UpdateDate = new DateTime(2014 - 11 - 02),
                    UpdatedBy = "ccts@seattleu.edu",
                    SchoolYear = "2006-07",
                    LeaverYear = "2005-06",
                    IsReported = true,
                    OpenDate = new DateTime(2007 - 07 - 01)
                },
                new SurveyDTO
                {
                    Id = 3,
                    Name = "Post-school Status of 2016 Special Education Student Leavers= 2015-16 Grads & Non-Grads",
                    Description = "2007 Post-School Status Follow-Up Survey",
                    SurveyTypeCode = "postschool",
                    Instructions = "test",
                    IsLocked = true,
                    CloseDate = new DateTime(2007 - 07 - 01),
                    CreateDate = new DateTime(2007 - 07 - 01),
                    CreatedBy = "admin",
                    UpdateDate = new DateTime(2014 - 11 - 02),
                    UpdatedBy = "ccts@seattleu.edu",
                    SchoolYear = "2007-08",
                    LeaverYear = "2006-07",
                    IsReported = true,
                    OpenDate = new DateTime(2007 - 07 - 01)
                }

            }; //Surveys = new List<SurveyDTO>

        } // MocksurveyData
    }  // public class MocksurveyData
}  // namespace AspNetCoreWebAPI.Data
