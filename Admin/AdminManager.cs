using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CCTS.TSF.Model;
using CCTS.TSF.Model.Common;
using CCTS.TSF.Repository;

namespace CCTS.TSF.Business
{
    public class AdminManager : IAdminManager
    {
        public IAdminRepository Repo;

        public AdminManager(IAdminRepository repo) => Repo = repo;

        public async Task<IEnumerable<StateTarget>> GetStateTargets() => await Repo.GetStateTargets();
        public async Task<OperationResult> AddTarget(StateTarget target) => await Repo.AddTarget(target);

        public async Task<OperationResult> UpdateTarget(StateTarget target) => await Repo.UpdateTarget(target);

        public async Task<IEnumerable<Import>> GetImportsList()
        {
            var results = await Repo.GetImportsList();

            return results.Select(result => new Import
                {
                    CreateDate = Convert.ToDateTime(result.CreateDate.ToString("MM/dd/yyyy HH:mm")),
                    Id = result.Id,
                    OriginalName = result.OriginalName,
                    Status = result.Status,
                    ErrorsFoundCount = result.ErrorsFoundCount,
                    Count = result.Count,
                    RowsProcessedCount = result.RowsProcessedCount,
                    RowsNotProcessedCount = result.RowsNotProcessedCount,
                    SurveyId = result.SurveyId,
                    IsComplete = result.IsComplete,
                    Comments = result.Comments
                })
                .ToList();
        }

        public async Task<OperationResult> DeleteImport(int id) => await Repo.DeleteImport(id);

        public async Task<IEnumerable<ImportError>> GetImportErrors(int id) => await Repo.GetImportErrors(id);

        public async Task<ImportRowDetail> GetImportRowDetails(int id, int rowId) => await Repo.GetImportRowDetail(id, rowId);

        public async Task<IEnumerable<Agency>> GetDistricts() => await Repo.GetDistricts();

        public async Task<OperationResult> AddDistrict(Agency agency) => await Repo.AddDistrict(agency);

        public async Task<OperationResult> UpdateDistrict(UpdateDistrict updateDistrict) => await Repo.UpdateDistrict(updateDistrict);

        public async Task<OperationResult> DeleteDistrict(int id) => await Repo.DeleteDistrict(id);

        public async Task<IEnumerable<UserListItem>> GetUsersList(int id, string email) => await Repo.GetUsersList(id, email);

        public async Task<OperationResult> DeleteUser(string userName) => await Repo.DeleteUser(userName);

        public async Task<IEnumerable<Agency>> GetAgenciesCCTS() => Repo.GetAgencies().Result.Where(i => i.Id != 1605).OrderBy(a => a.AgencyName);

        //Surveys William Thompson 2/5/18
        public IEnumerable<SurveyDTO> GetSurveys() => Repo.GetSurveys();

        public SurveyDTO GetSurvey(int SurveyId) => Repo.GetSurvey(SurveyId);

        public void AddSurvey<Survey>(SurveyDTO item) where Survey : class
        {
            Repo.AddSurvey(item);
        }

        public void UpdateSurvey<Survey>(int SurveyId, SurveyUpdateDTO item) where Survey : class
        {
            Repo.UpdateSurvey(SurveyId, item);
        }

        public void DeleteSurvey<Survey>(SurveyDTO item) where Survey : class
        {
            Repo.DeleteSurvey(item);
        }


        public bool SurveySave()
        {
            return (bool)Repo.SurveySave();
        }

        public bool SurveyExists(int SurveyId)
        {
            return (bool)Repo.SurveyExists(SurveyId);
        }

        //SurveyDetail William Thompson 2/12/18

        public IEnumerable<SurveyQuestionDetailDTO> GetSurveyQuestionDetails() => Repo.GetSurveyQuestionDetails();

        public SurveyQuestionDetailDTO GetSurveyQuestionDetail(int SurveyId) => Repo.GetSurveyQuestionDetail(SurveyId);

        public void AddSurveyQuestionDetail (SurveyQuestionDetailCreateDTO item) 
        {
            Repo.AddSurveyQuestionDetail(item);
        }


    }
}
