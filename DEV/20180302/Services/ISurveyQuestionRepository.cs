using AspNetCoreWebAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreWebAPI.Services
{
    public interface ISurveyQuestionRepository
    {
        // IEnumerable<SurveyQuestionDTO> GetSurveyQuestions();
        // Case 3
        IEnumerable<SurveyQuestionDTO> GetSurveyQuestion(int SurveyId);
        // Case 2
        //SurveyQuestionDTO GetSurveyQuestion(int SurveyId);
        // Case 1
        //IEnumerable<SurveyQuestionDTO> GetSurveyQuestion(int SurveyId);
        //SurveyQuestionDTO GetSurveyQuestion(int SurveyId);
        //void AddSurveyQuestion(SurveyQuestionCreateDTO SurveyQuestion);
        //void UpdateSurveyQuestion(int id, SurveyQuestionUpdateDTO SurveyQuestion);
        //void DeleteSurveyQuestion(SurveyQuestionDTO SurveyQuestion);
        //bool Save();
        //bool SurveyQuestionExists(int SurveyId);

    }
}
