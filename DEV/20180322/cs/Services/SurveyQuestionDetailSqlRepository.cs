using AspNetCoreWebAPI.Entities;
using System.Collections.Generic;
using System.Linq;
using AspNetCoreWebAPI.Models;
using AspNetCoreWebAPI.Data;
using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

//William Thompson 1/19/2018

namespace AspNetCoreWebAPI.Services
{
    public class SurveyQuestionDetailSqlRepository : ISurveyQuestionDetailRepository

    {

        private SqlDbContext _db;

        public SurveyQuestionDetailSqlRepository(SqlDbContext db)
        {
            _db = db;
        }



        //public IEnumerable<SurveyQuestionDetailDTO> GetSurveyQuestionDetails()
        //{
        //    var DTOs = Mapper.Map<IEnumerable<SurveyQuestionDetailDTO>>(_db.SurveyQuestionDetail);
        //    try
        //    {
        //        Console.WriteLine("test: {0}", "Test");
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //    finally
        //    {
                
        //    }
        //    return (DTOs);

        //}


        // 1
        public async Task<IEnumerable<SurveyQuestionDetailDTO>> GetSurveyQuestionDetail(int SurveyId)
        {

            var surveyQuestionDetail = await _db.SurveyQuestionDetail
                .FromSql("Select * from test.SurveyQuestionDetail")
                .Where(p => p.SurveyId.Equals(SurveyId)).ToListAsync();


            var DTOs = Mapper.Map<IEnumerable<SurveyQuestionDetailDTO>>(surveyQuestionDetail);

            return DTOs;
            }

        //    // 2
        //    public IEnumerable<SurveyQuestionDetailDTO> GetSurveyQuestionDetail(int SurveyId)
        //{

        //    var surveyQuestionDetail = _db.SurveyQuestionDetail
        //        .FromSql("Select * from test.SurveyQuestionDetail")
        //        .Where(p => p.SurveyId.Equals(SurveyId));  //.ToListAsync()


        //    var DTOs = Mapper.Map<IEnumerable<SurveyQuestionDetailDTO>>(surveyQuestionDetail);

        //    return DTOs;
        //}


        public void AddSurveyQuestionDetail(SurveyQuestionDetailCreateDTO surveyQuestionDetail)
        {

            // wnt
            var proc = "[test].[usp_SurveyDetail_Add] @p0;";
            //var results = _db.SurveyQuestionDetail.FromSql(proc, surveyQuestionDetail.SurveyId);
            _db.Database
           .ExecuteSqlCommand(proc, surveyQuestionDetail.SurveyId);


            return ;

        }



    }
}

