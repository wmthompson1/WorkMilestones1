using AspNetCoreWebAPI.Models;
using System.Collections.Generic;

namespace AspNetCoreWebAPI.Data
{
    public class MockSurveyQuestionData
    {
        // Create static instance of the MockData class
        public static MockSurveyQuestionData Current { get; } = new MockSurveyQuestionData();
        public List<SurveyQuestionDTO> SurveyQuestion { get; set; }
        public List<QItemDTO> QItem { get; set; }

        public MockSurveyQuestionData()
        {
            SurveyQuestion = new List<SurveyQuestionDTO>
            {
                new SurveyQuestionDTO {  SurveyId = 1, SurveyName = "Survey Named Tester1", PageId = 11, Text = "A question asked - about something1" , QuestionId = 1},
                new SurveyQuestionDTO {  SurveyId = 1, SurveyName = "Survey Named Tester1", PageId = 11, Text = "A question asked - about something2" , QuestionId = 2},

                new SurveyQuestionDTO {  SurveyId = 2, SurveyName = "Survey Named Tester1", PageId = 11, Text = "A question asked - about something3", QuestionId = 3},
                new SurveyQuestionDTO {  SurveyId = 2, SurveyName = "Survey Named Tester1", PageId = 11, Text = "A question asked - about something4", QuestionId = 4},


            };

            //   SurveyId = s.Id,
            //   SurveyName = s.Name,
            //   PageId = p.Id,
            //   PageName = p.Name,
            //   QuestionId = q.Id,
            //   QuestionGroupId = q.QuestionGroupId,
            //   q.[Text],
            //   q.QuestionTypeCode,
            //   q.QuestionNumberText,
            //   q.IsRequired,
            //   q.Visible,
            //   QuestionSortId = q.SortId,
            //   p.Instructions,
            //   PageSortId = p.SortId,
            //   LeaverYear = CAST('2016-17' AS CHAR(7)),
            //   SurveyTypeCode = s.SurveyTypeCode

            QItem = new List<QItemDTO>
            {
                new QItemDTO { QItemId = 101, QItemText = "An answer (QItem) here - something11", QuestionId = 1, QItemSortId = 1 },
                new QItemDTO { QItemId = 102, QItemText = "An answer (QItem) here - something12", QuestionId = 1, QItemSortId = 2 },

                new QItemDTO { QItemId = 103, QItemText = "An answer (QItem) here - something22", QuestionId = 2, QItemSortId = 1 },
                new QItemDTO { QItemId = 104, QItemText = "An answer (QItem) here - something22", QuestionId = 2, QItemSortId = 2 },


              // QItemId = qi.Id
              //,QItemText = qi.[Text]
              //,qi.QuestionId
              //,qi.ItemNumberText
              //,qi.ItemNumberDisplayText
              //,qi.DisplayAsTextBox
              //,QItemSortId = qi.SortId
            };
        }
    }
}
