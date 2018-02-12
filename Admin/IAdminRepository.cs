using CCTS.TSF.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using CCTS.TSF.Model.Common;

namespace CCTS.TSF.Repository
{
    public interface IAdminRepository
    {
        Task<IEnumerable<StateTarget>> GetStateTargets();
        Task<OperationResult> AddTarget(StateTarget target);
        Task<OperationResult> UpdateTarget(StateTarget target);
        Task<IEnumerable<Import>> GetImportsList();
        Task<OperationResult> DeleteImport(int id);
        Task<IEnumerable<ImportError>> GetImportErrors(int id);
        Task<ImportRowDetail> GetImportRowDetail(int id, int rowId);
        Task<IEnumerable<Agency>> GetDistricts();
        Task<IEnumerable<Agency>> GetAgencies();
        Task<OperationResult> AddDistrict(Agency agency);
        Task<OperationResult> UpdateDistrict(UpdateDistrict updateDistrict);
        Task<OperationResult> DeleteDistrict(int id);
        Task<IEnumerable<UserListItem>> GetUsersList(int id, string email);
        Task<OperationResult> DeleteUser(string userName);

        // Surveys

        IEnumerable<SurveyDTO> GetSurveys();
        SurveyDTO GetSurvey(int SurveyId);
        void AddSurvey(SurveyDTO Survey);
        void UpdateSurvey(int id, SurveyUpdateDTO Survey);
        void DeleteSurvey(SurveyDTO Survey);
        bool SurveySave();
        bool SurveyExists(int SurveyId);

        // SurveyDetail

        IEnumerable<SurveyQuestionDetailDTO> GetSurveyQuestionDetails();
        SurveyQuestionDetailDTO GetSurveyQuestionDetail(int SurveyId);
        void AddSurveyQuestionDetail(SurveyQuestionDetailCreateDTO SurveyQuestionDetail);





    }
}
