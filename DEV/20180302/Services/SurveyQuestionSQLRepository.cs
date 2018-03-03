using AspNetCoreWebAPI.Entities;
using AspNetCoreWebAPI.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWebAPI.Services
{
    public class SurveyQuestionSqlRepository : ISurveyQuestionRepository
    {
        private SqlDbContext _db;

        public SurveyQuestionSqlRepository(SqlDbContext db)
        {
            _db = db;
        }


        //public PublisherDTO GetSurveyQuestions(int surveyId)
        //{
        //    var publisher = _db.Publishers.FirstOrDefault(p =>
        //        p.Id.Equals(publisherId));

        //    if (includeBooks && publisher != null)
        //    {
        //        _db.Entry(publisher).Collection(c => c.Books).Load();
        //    }

        //    var publisherDTO = Mapper.Map<PublisherDTO>(publisher);

        //    return publisherDTO;
        //}

        // case 2
        //public SurveyQuestionDTO GetSurveyQuestion(int surveyId)
        // case 1
        public IEnumerable<SurveyQuestionDTO> GetSurveyQuestion(int surveyId)
        {

            //// case 5C 3/2/2018 

            var surveyQuestion = _db.SurveyQuestion
            .FromSql("Select * from test.SurveyQuestion")
            .Where(p => p.SurveyId.Equals(surveyId));

            foreach (SurveyQuestion s in surveyQuestion)
            {


                //    //var surveyQuestion = _db.SurveyQuestion.Include(d => d.QItem);
                //    // case 6 https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/read-related-data



                // case 1
                //_db.Entry(surveyQuestion).Collection(c => QItem).Load();

                // case 2
                _db.SurveyQuestion
                    .Include(d => d.QItem)
                    //.FirstOrDefault(p => p.SurveyId.Equals(surveyId))
                    .ToList()
                    ;

            }
            //    .FirstOrDefault(p => p.SurveyId.Equals(surveyId));

            //// case 5B 3/2/2018 - ?
            //var surveyQuestion = _db.SurveyQuestion
            //    .Select(p => p.SurveyId.Equals(surveyId));

            // case 5B 3/2/2018 - **BUT ONLY ONE ROW **
            //var surveyQuestion = _db.SurveyQuestion
            //    .FirstOrDefault(p => p.SurveyId.Equals(surveyId));


            // case 5A 3/2/2018 works with just dto case 2
            //var surveyQuestion = _db.SurveyQuestion
            //    .FirstOrDefault(p => p.SurveyId == 1);

            //// case 7
            //var surveyQuestion = _db.SurveyQuestion.Select<IEnumerable<SurveyQuestionDTO>>(p => p.SurveyId.Equals(surveyId));

            // case 6
            //var surveyQuestion = _db.SurveyQuestion.Select(p => p.SurveyId.Equals(surveyId));


            // case 1
            //var surveyQuestion = _db.SurveyQuestion.FirstOrDefault(p =>
            //    p.SurveyId.Equals(surveyId) );


            // case 4
            //var surveyQuestion = _db.SurveyQuestion.FirstOrDefault(p =>
            //    p.SurveyId.Equals(surveyId));

            //case 2 - note raw sql cannot include related data
            //var surveyQuestion = _db.SurveyQuestion
            //    .FromSql("Select * from test.SurveyQuestion")
            //    .Where(p => p.SurveyId.Equals(surveyId));

            //case 3
            //var prod = _context.Products
            //            .Include(p => p.Categorization)
            //                .ThenInclude(c => c.Category)
            //            .FirstOrDefault(p => p.Id == 1));

            // case 3
            // ERROR '...but is defined in the model as a collection navigation property'
            //_db.Entry(surveyQuestion).Reference(c => c.QItem).Load();

            // case 2 ** works 3/2/18 **
            //_db.Entry(surveyQuestion).Collection<QItem>(c => c.QItem).Load();
            // case 1
            //_db.Entry(surveyQuestion).Collection(c => c.QItem).Load();

            // case 2
            var DTOs = Mapper.Map<IEnumerable<SurveyQuestionDTO>>(surveyQuestion);

            // case 2
            //var DTOs = Mapper.Map<SurveyQuestionDTO>(surveyQuestion);

            // case 1
            //var surveyQuestionDTO = Mapper.Map<IEnumerable<SurveyQuestionDTO>>(surveyQuestion);
                        
            try
            {
                Console.WriteLine("test: {0}", "Test");
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {

            }

            // case 3
            // return DTOs

            // case 2
            // ?

            // case 1
            return DTOs;
           
        }


        //public IEnumerable<BookDTO> GetBooks(int publisherId)
        //{
        //    var books = _db.Books.Where(b =>
        //        b.PublisherId.Equals(publisherId));
        //    var bookDTOs = Mapper.Map<IEnumerable<BookDTO>>(books);

        //    return bookDTOs;
        //}

        //public IEnumerable<PublisherDTO> GetPublishers()
        //{
        //    return Mapper.Map<IEnumerable<PublisherDTO>>(_db.Publishers);
        //}

        //public bool PublisherExists(int publisherId)
        //{
        //    return _db.Publishers.Count(p => p.Id.Equals(publisherId)) == 1;
        //}

        //public bool Save()
        //{
        //    return _db.SaveChanges() >= 0;
        //}

    }
}
