using AspNetCoreWebAPI.Entities;
using System.Collections.Generic;
using System.Linq;
using AspNetCoreWebAPI.Models;
using AspNetCoreWebAPI.Data;
using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

//William Thompson 3/20/2018 SurveyTransactionSQLRepository
//Requires using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWebAPI.Services
{
    public class SurveyTransactionSQLRepository : ISurveyTransactionRepository

    {

        private SqlDbContext _db;

        public SurveyTransactionSQLRepository(SqlDbContext db)
        {
            _db = db;
        }

        public IEnumerable<SurveyTransactionDTO> GetSurveyTransactions()
        {
            return Mapper.Map<IEnumerable<SurveyTransactionDTO>>(_db.SurveyTransaction);
        }

        //// always pass id to id generator
        // public SurveyTransactionDTO GetSurveyTransaction(int Id)
        // {
        //     //var surveyTransaction = _db.SurveyTransaction.FirstOrDefault(p =>
        //     //    p.Id.Equals(Id));

        //     //var surveyTransactionDTO = Mapper.Map<SurveyTransactionDTO>(surveyTransaction);

        //     return Mapper.Map<IEnumerable<SurveyTransactionDTO>>(_db.SurveyTransaction);

        //     return surveyTransactionDTO;
        // }

        // requires using Microsoft.EntityFrameworkCore;
        public SurveyTransactionDTO GetSurveyTransaction(int Id)
        {

            var surveyTransaction = _db.SurveyTransaction
                .FromSql("EXEC Test.usp_SurveyTransaction 0")
                .ToList();

            //var proc = "[test].[usp_SurveyTransaction] @p0;";
            ////var results = _db.SurveyTransaction.FromSql(proc, 0);
            //var surveyTransaction = _db.SurveyTransaction.FromSQL("Test.usp_SurveyTransaction @p0", 0).ToList();

            //var DTOs = Mapper.Map<SurveyTransactionDTO>(surveyTransaction);	

            // requires using Microsoft.EntityFrameworkCore;
            //var proc = "[test].[usp_SurveyTransaction] @p0;";
            // this proc always passes 0 to conform to HTTP GET syntax
            // this proc is used as an id generator because we didn't want to update Nuget
            //var surveyTransaction = _db.SurveyTransaction.FromSql(proc, 0).ToList();
            // _db.SurveyTransaction.E
            //.ExecuteSqlCommand(proc, 0);

            var DTOs = Mapper.Map<SurveyTransactionDTO>(surveyTransaction);
            //_db.SurveyTransaction.Where

            return DTOs;
        }

        //public SurveyTransactionDTO GetSurveyTransactions(int Id)
        //{

        //    var surveyTransaction = _db.SurveyTransaction
        //        .FromSql("EXEC Test.usp_SurveyTransaction 0")
        //        .ToList();

        //    //var proc = "[test].[usp_SurveyTransaction] @p0;";
        //    ////var results = _db.SurveyTransaction.FromSql(proc, 0);
        //    //var surveyTransaction = _db.SurveyTransaction.FromSQL("Test.usp_SurveyTransaction @p0", 0).ToList();

        //    //var DTOs = Mapper.Map<SurveyTransactionDTO>(surveyTransaction);	

        //    // requires using Microsoft.EntityFrameworkCore;
        //    //var proc = "[test].[usp_SurveyTransaction] @p0;";
        //    // this proc always passes 0 to conform to HTTP GET syntax
        //    // this proc is used as an id generator because we didn't want to update Nuget
        //    //var surveyTransaction = _db.SurveyTransaction.FromSql(proc, 0).ToList();
        //    // _db.SurveyTransaction.E
        //    //.ExecuteSqlCommand(proc, 0);

        //    var DTOs = Mapper.Map<SurveyTransactionDTO>(surveyTransaction);
        //    //_db.SurveyTransaction.Where

        //    return DTOs;
        //}

        //public void AddSurveyTransaction(SurveyTransactionDTO surveyTransaction)
        //    {
        //        var surveyTransactionToAdd = Mapper.Map<SurveyTransaction>(surveyTransaction);
        //        _db.SurveyTransaction.Add(surveyTransactionToAdd);
        //    }

        public bool SaveSurveyTransaction()
        {
            return _db.SaveChanges() >= 0;
        }

        public void UpdateSurveyTransaction(int id, SurveyTransactionUpdateDTO surveyTransaction)
        {
            var stub = GetSurveyTransaction(id);

            var surveyTransactionToUpdate = _db.SurveyTransaction.FirstOrDefault(p => p.Id.Equals(id));

            if (surveyTransactionToUpdate == null) return;

            surveyTransactionToUpdate.BatchId = surveyTransaction.BatchId;
            surveyTransactionToUpdate.LeaverYear = surveyTransaction.LeaverYear;
            surveyTransactionToUpdate.CopyFromId = surveyTransaction.CopyFromId;

        }

        public bool SurveyTransactionExists(int surveyTransactionId)
        {
            return _db.SurveyTransaction.Count(p => p.Id.Equals(surveyTransactionId)).Equals(1);
        }


        public void DeleteSurveyTransaction(SurveyTransactionDTO surveyTransaction)
        {

            var surveyTransactionToDelete = _db.SurveyTransaction.FirstOrDefault(p =>
            p.Id.Equals(surveyTransaction.Id));

            if (surveyTransactionToDelete != null)
                _db.SurveyTransaction.Remove(surveyTransactionToDelete);

        }

    }
}

