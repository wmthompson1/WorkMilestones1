using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CCTS.TSF.Model;
using CCTS.TSF.Model.Common;
using CCTS.TSF.Repository.Common;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using AutoMapper;

namespace CCTS.TSF.Repository
{
    public class AdminRepository : RepositoryBase<CCTSTSFContext>, IAdminRepository
    {
        private readonly CCTSTSFContext _context;

        public AdminRepository(CCTSTSFContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StateTarget>> GetStateTargets()
        {
            List<StateTarget> results = null;
            var proc = "[dbo].[usp_GetStateTargets]";
            results = await _context.StateTargets.FromSql(proc).AsNoTracking().ToListAsync();
            return results;
        }

        public async Task<OperationResult> AddTarget(StateTarget target)
        {
            var userName = "dbo";

            var proc = "[dbo].[usp_AddStateTarget] @p0, @p1, @p2, @p3, @p4";

            var results = await _context.DeleteRecord.FromSql(proc, target.TargetType, target.SchoolYear, target.TargetName, target.TargetValue, userName).ToListAsync();

            var result = new OperationResult();
            foreach(var res in results)
            {
                //should always be 1 row
                result.IsSuccessful = res.Success;
                result.ErrorMessages = res.Success ? null : new List<string> { "Add operation failed." };
                result.UserMessages = null;
                result.NewId = string.Empty;
                break;
            }
            return result;
        }

        public async Task<OperationResult> UpdateTarget(StateTarget target)
        {
            var userName = "dbo";

            var proc = "[dbo].[usp_UpdateStateTarget] @p0, @p1, @p2, @p3, @p4, @p5";

            var results = await _context.DeleteRecord.FromSql(proc, target.TargetType, target.SchoolYear, target.TargetName, target.TargetValue, userName, target.Id).ToListAsync();
            var result = new OperationResult();

            foreach (var res in results)
            {
                // always 1
                result.IsSuccessful = res.Success;
                result.ErrorMessages = res.Success ? null : new List<string> { "Update operation failed." };
                result.UserMessages = null;
                result.NewId = string.Empty;
                break;
            }

            return result;
        }

        public async Task<IEnumerable<Import>> GetImportsList()
        {
            var proc = "[dbo].[pr_post_GetImportLogs]";
            var results = await _context.Imports.FromSql(proc).ToListAsync();
            return results;
        }

        public async Task<OperationResult> DeleteImport(int id)
        {
            var proc = "[dbo].[pr_post_DeleteImportBatch] @p0";
            var results = await _context.DeleteRecord.FromSql(proc, id).ToListAsync();
            var result = new OperationResult();
            foreach (var res in results)
            {
                // always 1
                result.IsSuccessful = res.Success;
                result.ErrorMessages = res.Success ? null : new List<string> { "Delete operation failed." };
                result.UserMessages = null;
                result.NewId = string.Empty;
                break;
            }

            return result;
        }

        public async Task<IEnumerable<ImportError>> GetImportErrors(int id)
        {
            var proc = "[dbo].[usp_getImportErrors] @p0";
            var results = await _context.ImportErrors.FromSql(proc, id).ToListAsync();
            return results;
        }

        public async Task<ImportRowDetail> GetImportRowDetail(int id, int rowId)
        {
            try
            {


                var proc = "[dbo].[usp_GetImportRowDetail] @p0, @p1";
                var results = new List<Csv>();
                results = await _context.ImportRowDetails.FromSql(proc, id, rowId).ToListAsync();

                // should always be 1
                var detail = results[0].CsvValue.Split(new char[] { ',' }, StringSplitOptions.None);

                var row = new ImportRowDetail
                {
                    Id = Convert.ToInt32(results[0].Id),
                    SSID = !string.IsNullOrWhiteSpace(detail[0]) ? detail[0] : string.Empty,
                    FName = !string.IsNullOrWhiteSpace(detail[1]) ? detail[1] : string.Empty,
                    LName = !string.IsNullOrWhiteSpace(detail[2]) ? detail[2] : string.Empty,
                    Gender = !string.IsNullOrWhiteSpace(detail[5]) ? detail[5] : string.Empty,
                    BirthDate = !string.IsNullOrWhiteSpace(detail[6]) ? detail[6] : string.Empty,
                    Dist = !string.IsNullOrWhiteSpace(detail[8]) ? detail[8] : string.Empty,
                    HighSchool = !string.IsNullOrWhiteSpace(detail[9]) ? detail[9] : string.Empty,
                    SchoolName = !string.IsNullOrWhiteSpace(detail[10]) ? detail[10] : string.Empty,
                    ExitStatus = !string.IsNullOrWhiteSpace(detail[3]) ? detail[3] : string.Empty,
                    Ethnicity = !string.IsNullOrWhiteSpace(detail[4]) ? detail[4] : string.Empty,
                    Disability = !string.IsNullOrWhiteSpace(detail[7]) ? detail[7] : string.Empty
                };

                return row;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Agency>> GetDistricts()
        {
            var proc = "[dbo].[usp_GetDistricts] @p0";
            var param = "DISTRICT";
            var results = await _context.Agencies.FromSql(proc, param).AsNoTracking().ToListAsync();
            return results;
        }

        public async Task<OperationResult> AddDistrict(Agency agency)
        {
           
            var proc = "[dbo].[usp_AddDistricts] @p0, @p1, @p2, @p3, @p4";

            var results = await _context.Agency.FromSql(proc, agency.ParentId, agency.CountyName, agency.AgencyCode, agency.AgencyName, agency.IsActive).ToListAsync();

            var result = new OperationResult();
            foreach (var res in results)
            {
                //should always be 1 row
                result.IsSuccessful = res.Success;
                result.ErrorMessages = res.Success ? null : new List<string> { "Add operation failed." };
                result.UserMessages = null;
                result.NewId = string.Empty;
                break;
            }
            return result;
        }

        public async Task<OperationResult> UpdateDistrict(UpdateDistrict updateDistrict)
        {
            //var userName = "dbo";

            var proc = "[dbo].[usp_UpdateDistrict] @p0, @p1, @p2, @p3, @p4, @p5";

            var results = await _context.DeleteRecord.FromSql(proc, updateDistrict.ParentId, updateDistrict.AgencyCode, updateDistrict.AgencyName, updateDistrict.CountyName, updateDistrict.IsActive, updateDistrict.Id).ToListAsync();
            var result = new OperationResult();

            foreach (var res in results)
            {
                // always 1
                result.IsSuccessful = res.Success;
                result.ErrorMessages = res.Success ? null : new List<string> { "Update operation failed." };
                result.UserMessages = null;
                result.NewId = string.Empty;
                break;
            }

            return result;
        }

        public async Task<OperationResult> DeleteDistrict(int id)
        {
            var proc = "[dbo].[usp_DeleteDistrict] @p0";
            var results = await _context.DeleteRecord.FromSql(proc, id).ToListAsync();
            var result = new OperationResult();
            foreach (var res in results)
            {
                // always 1
                result.IsSuccessful = res.Success;
                result.ErrorMessages = res.Success ? null : new List<string> { "Delete operation failed." };
                result.UserMessages = null;
                result.NewId = string.Empty;
                break;
            }

            return result;
        }

        public async Task<IEnumerable<UserListItem>> GetUsersList(int id, string email)
        {
            var proc = "[dbo].[pr_users_GetAllUsers] @p0, @p1";
            var results = await _context.Users.FromSql(proc, email, id).OrderBy(a => a.AgencyName).ToListAsync();
            return results;
        }

        public async Task<OperationResult> DeleteUser(string userName)
        {
            var proc = "[dbo].[usp_DeleteUser] @p0";
            var results = await _context.DeleteRecord.FromSql(proc, userName).ToListAsync();
            var result = new OperationResult();
            foreach (var res in results)
            {
                //should always be 1 row
                result.IsSuccessful = res.Success;
                result.ErrorMessages = res.Success ? null : new List<string> { "Delete operation failed." };
                result.UserMessages = null;
                result.NewId = string.Empty;
                break;
            }
            return result;
        }

        // Surveys

        public IEnumerable<SurveyDTO> GetSurveys()
        {
            //return Mapper.Map<IEnumerable<SurveyDTO>>(_context.Survey);
            return Mapper.Map<IEnumerable<SurveyDTO>>(_context.Survey.OrderByDescending(p => p.Id));
            
        }

        public SurveyDTO GetSurvey(int Id)
        {
            var survey = _context.Survey.FirstOrDefault(p =>
                p.Id.Equals(Id));

            var surveyDTO = Mapper.Map<SurveyDTO>(survey);


            return surveyDTO;
        }

        public void AddSurvey(SurveyDTO survey)
        {
            var surveyToAdd = Mapper.Map<Survey>(survey);
            _context.Survey.Add(surveyToAdd);
        }

        public bool SurveySave()
        {
            return _context.SaveChanges() >= 0;
        }

        public void UpdateSurvey(int id, SurveyUpdateDTO survey)
        {
            var stub = GetSurvey(id);

            var surveyToUpdate = _context.Survey.FirstOrDefault(p => p.Id.Equals(id));

            if (surveyToUpdate == null) return;

            surveyToUpdate.Name = survey.Name;
            surveyToUpdate.Description = survey.Description;
            surveyToUpdate.SurveyTypeCode = survey.SurveyTypeCode;
            surveyToUpdate.Instructions = survey.Instructions;
            surveyToUpdate.IsLocked = survey.IsLocked;

            surveyToUpdate.CloseDate = survey.CloseDate;
            surveyToUpdate.CreateDate = survey.CreateDate;
            surveyToUpdate.CreatedBy = survey.CreatedBy;
            surveyToUpdate.UpdateDate = survey.UpdateDate;
            surveyToUpdate.UpdatedBy = survey.UpdatedBy;

            surveyToUpdate.SchoolYear = survey.SchoolYear;
            surveyToUpdate.LeaverYear = survey.LeaverYear;
            surveyToUpdate.IsReported = survey.IsReported;
            surveyToUpdate.OpenDate = survey.OpenDate;

        }

        public bool SurveyExists(int surveyId)
        {
            return _context.Survey.Count(p => p.Id.Equals(surveyId)).Equals(1);
        }

        public void DeleteSurvey(SurveyDTO survey)
        {

            var surveyToDelete = _context.Survey.FirstOrDefault(p =>
            p.Id.Equals(survey.Id));

            if (surveyToDelete != null)
                _context.Survey.Remove(surveyToDelete);

        }

        public async Task<IEnumerable<Agency>> GetAgencies()
        {
            var proc = "[dbo].[usp_GetDistricts] @p0";
            var param = "all";
            var results = await _context.Agencies.FromSql(proc, param).AsNoTracking().ToListAsync();
            return results;
        }

        //SurveyDetail

        public IEnumerable<SurveyQuestionDetailDTO> GetSurveyQuestionDetails()
        {
            var DTOs = Mapper.Map<IEnumerable<SurveyQuestionDetailDTO>>(_context.SurveyQuestionDetail);
            return (DTOs);

        }

        public SurveyQuestionDetailDTO GetSurveyQuestionDetail(int SurveyId)
        {
            var surveyQuestionDetail = _context.SurveyQuestionDetail.Where(p =>
                p.SurveyId.Equals(SurveyId));


            var surveyQuestionDetailDTO = Mapper.Map<SurveyQuestionDetailDTO>(surveyQuestionDetail);


            return surveyQuestionDetailDTO;
        }

        public void AddSurveyQuestionDetail(SurveyQuestionDetailCreateDTO surveyQuestionDetail)
        {

            var proc = "[test].[usp_SurveyDetail_Add] @p0;";
            _context.Database
           .ExecuteSqlCommand(proc, surveyQuestionDetail.SurveyId);


            return;

        }



    }
}
