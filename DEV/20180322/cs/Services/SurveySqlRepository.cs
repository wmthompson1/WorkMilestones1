using AspNetCoreWebAPI.Entities;
using System.Collections.Generic;
using System.Linq;
using AspNetCoreWebAPI.Models;
using AspNetCoreWebAPI.Data;
using System;
using AutoMapper;

//William Thompson 1/19/2018

namespace AspNetCoreWebAPI.Services
{
    public class SurveySqlRepository : ISurveyRepository

    {

        private SqlDbContext _db;

        public SurveySqlRepository(SqlDbContext db)
        {
            _db = db;
        }

        public IEnumerable<SurveyDTO> GetSurveys()
        {
            return Mapper.Map<IEnumerable<SurveyDTO>>(_db.Survey);
        }

        public SurveyDTO GetSurvey(int Id)
        {
            var survey = _db.Survey.FirstOrDefault(p =>
                p.Id.Equals(Id));

            var surveyDTO = Mapper.Map<SurveyDTO>(survey);


            return surveyDTO;
        }

        public void AddSurvey(SurveyDTO survey)
        {
            var surveyToAdd = Mapper.Map<Survey>(survey);
            _db.Survey.Add(surveyToAdd);
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0;
        }

         public void UpdateSurvey(int id, SurveyUpdateDTO survey)
        {
            var stub = GetSurvey(id);

            var surveyToUpdate = _db.Survey.FirstOrDefault(p =>  p.Id.Equals(id));

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

        public void UpdateSurveyNoDate(int id, SurveyUpdateNoDateDTO survey)
        {
            var stub = GetSurvey(id);

            var surveyToUpdate = _db.Survey.FirstOrDefault(p => p.Id.Equals(id));

            if (surveyToUpdate == null) return;

            surveyToUpdate.Name = survey.Name;
            surveyToUpdate.Description = survey.Description;
            surveyToUpdate.SurveyTypeCode = survey.SurveyTypeCode;
            surveyToUpdate.Instructions = survey.Instructions;
            surveyToUpdate.IsLocked = survey.IsLocked;

            //surveyToUpdate.CloseDate = survey.CloseDate;
            //surveyToUpdate.CreateDate = survey.CreateDate;
            surveyToUpdate.CreatedBy = survey.CreatedBy;
            //surveyToUpdate.UpdateDate = survey.UpdateDate;
            surveyToUpdate.UpdatedBy = survey.UpdatedBy;

            surveyToUpdate.SchoolYear = survey.SchoolYear;
            surveyToUpdate.LeaverYear = survey.LeaverYear;
            surveyToUpdate.IsReported = survey.IsReported;
            //surveyToUpdate.OpenDate = survey.OpenDate;

        }

        public bool SurveyExists(int surveyId)
        {
            return _db.Survey.Count(p => p.Id.Equals(surveyId)).Equals(1);
        }


        public void DeleteSurvey(SurveyDTO survey)
        {

            var surveyToDelete = _db.Survey.FirstOrDefault(p =>
            p.Id.Equals(survey.Id));

            if (surveyToDelete != null)
                _db.Survey.Remove(surveyToDelete);

        }
                
    }
}

