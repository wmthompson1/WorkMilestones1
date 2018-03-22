using AspNetCoreWebAPI.Models;
using System.Collections.Generic;

namespace AspNetCoreWebAPI.Services
{
    public interface ISurveyRepository
    {
        IEnumerable<SurveyDTO> GetSurveys();
        SurveyDTO GetSurvey(int SurveyId);
        void AddSurvey(SurveyDTO Survey);
        void UpdateSurvey(int id, SurveyUpdateDTO Survey);
        void UpdateSurveyNoDate(int id, SurveyUpdateNoDateDTO Survey);
        void DeleteSurvey(SurveyDTO Survey);
        bool Save();
        bool SurveyExists(int SurveyId);

    }
}
