using AspNetCoreWebAPI.Entities;
using AspNetCoreWebAPI.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

//Requires using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWebAPI.Services
{
    public class SurveyBaseSqlRepository : ISurveyBaseRepository
    {
        private SqlDbContext _db;

        public SurveyBaseSqlRepository(SqlDbContext db)
        {
            _db = db;
        }

        public IEnumerable<SurveyBaseDTO> GetSurveyBase()
        {

            var results = _db.SurveyBase
                .FromSql("Exec test.usp_SurveyGetTokenized").AsNoTracking()
            ;

            var x = Mapper.Map<IEnumerable<SurveyBaseDTO>>(results);

            return x;
        }

        //1
        // public IEnumerable<SurveyBaseDTO> GetSurveyBaseById(int Id)
        //2
        public SurveyBaseDTO GetSurveyBaseById(int Id)
        {
            var survey = _db.SurveyBase.FirstOrDefault(p =>
                p.Id.Equals(Id));

            var DTOs = Mapper.Map<SurveyBaseDTO>(survey);

            //return surveyDTO;

            // id, leaverYear for now; TODO: add the remaining post fields
            //var proc = "test.usp_SurveyGetTokenized @p0";

            //var results = _db.SurveyBase.FromSql(proc, Id);

            //1
            // var DTOs = Mapper.Map<IEnumerable<SurveyBaseDTO>>(results);
            // 2
            // var DTOs = Mapper.Map<SurveyBaseDTO>(results);

            return DTOs;
        }

        // @SurveyId INT  -- @CopyFromId -- > 1
        //,@LeaverYear CHAR(7)  = NULL -- > 2   
        //,@Name nvarchar(500) = NULL -- > 3
        //,@Description nvarchar(3000) = NULL -- > 4
        //,@SurveyTypeCode varchar(50) = NULL -- > 5

        //,@Instructions nvarchar(3000) = NULL -- > 6
        //,@IsLocked bit = NULL-- > 7
        //,@CreatedBy varchar(50) = NULL -- > 8
        //,@UpdatedBy varchar(50) = NULL -- > 9
        //,@SchoolYear char (7) = NULL -- > 10

        //,@IsReported bit = NULL-- > 11

        public void AddSurveyBase(SurveyBaseNoDateDTO surveyBase)
        {

            // id, leaverYear for now; TODO: add the remaining post fields
            //var proc = "[test].[usp_SurveyDetail_Add] @p0, @p1";
            var proc = "[test].[usp_SurveyDetail_Add] @p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10";

            //_db.Database.ExecuteSqlCommand(proc, surveyBase.CopyFromId, surveyBase.LeaverYear);
            _db.Database.ExecuteSqlCommand(proc,    surveyBase.CopyFromId, surveyBase.LeaverYear, surveyBase.Name, surveyBase.Description, 
                                                    surveyBase.SurveyTypeCode, surveyBase.Instructions, surveyBase.IsLocked, surveyBase.CreatedBy, surveyBase.UpdatedBy,
                                                    surveyBase.SchoolYear, surveyBase.IsReported);

            return;

        }





    }
}

