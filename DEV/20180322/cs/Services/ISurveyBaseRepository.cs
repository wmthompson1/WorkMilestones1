using AspNetCoreWebAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Services
{
    public interface ISurveyBaseRepository
    {
       IEnumerable<SurveyBaseDTO> GetSurveyBase();
        //1
        //IEnumerable<SurveyBaseDTO> GetSurveyBaseById(int SurveyId);
        // 2
        SurveyBaseDTO GetSurveyBaseById(int SurveyId);
        void AddSurveyBase(SurveyBaseNoDateDTO SurveyBase);

    }
}
