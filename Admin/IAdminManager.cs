using System.Collections.Generic;
using System.Threading.Tasks;
using CCTS.TSF.Model;
using CCTS.TSF.Model.Common;

namespace CCTS.TSF.Business
{
    public interface IAdminManager
    {
        Task<IEnumerable<StateTarget>> GetStateTargets();
        Task<OperationResult> AddTarget(StateTarget target);
        Task<OperationResult> UpdateTarget(StateTarget target);
        Task<IEnumerable<Import>> GetImportsList();
        Task<OperationResult> DeleteImport(int id);
        Task<IEnumerable<ImportError>> GetImportErrors(int id);
        Task<ImportRowDetail> GetImportRowDetails(int id, int rowId);
        Task<IEnumerable<Agency>> GetDistricts();
        Task<OperationResult> AddDistrict(Agency agency);
        Task<OperationResult> UpdateDistrict(UpdateDistrict updateDistrict);
        Task<OperationResult> DeleteDistrict(int id);
        Task<IEnumerable<UserListItem>> GetUsersList(int id, string email);
        Task<OperationResult> DeleteUser(string userName);
        Task<IEnumerable<Agency>> GetAgenciesCCTS();

        //Surveys William Thompson 2/5/18
        IEnumerable<SurveyDTO> GetSurveys();
        SurveyDTO GetSurvey(int SurveyId);
        void AddSurvey<Survey>(SurveyDTO item) where Survey : class;
        void UpdateSurvey<Survey>(int id, SurveyUpdateDTO item) where Survey : class;
        void DeleteSurvey<Survey>(SurveyDTO item) where Survey : class;
        bool SurveySave();
        bool SurveyExists(int SurveyId);

        //SurveyDetail William Thompson 2/12/2018
        IEnumerable<SurveyQuestionDetailDTO> GetSurveyQuestionDetails();
        SurveyQuestionDetailDTO GetSurveyQuestionDetail(int SurveyId);
        void AddSurveyQuestionDetail(SurveyQuestionDetailCreateDTO SurveyQuestionDetail);


    }
}
