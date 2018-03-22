using AspNetCoreWebAPI.Models;
using System.Collections.Generic;

namespace AspNetCoreWebAPI.Services
{
    public interface ISurveyTransactionRepository
    {
        IEnumerable<SurveyTransactionDTO> GetSurveyTransactions();
        SurveyTransactionDTO GetSurveyTransaction(int SurveyTransactionId);
        //SurveyTransactionDTO GetSurveyTransactions(int SurveyTransactionId);
        //void AddSurveyTransaction(SurveyTransactionDTO SurveyTransaction);
        void UpdateSurveyTransaction(int id, SurveyTransactionUpdateDTO SurveyTransaction);
        void DeleteSurveyTransaction(SurveyTransactionDTO SurveyTransaction);
        bool SaveSurveyTransaction();
        bool SurveyTransactionExists(int SurveyTransactionId);

    }
}