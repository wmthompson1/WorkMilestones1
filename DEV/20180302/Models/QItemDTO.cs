
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Models
{
    public class QItemDTO
    {
        public int QItemId { get; set; }
        public string QItemText { get; set; }
        public int QuestionId { get; set; }
        public string ItemNumberText { get; set; }
        public string ItemNumberDisplayText { get; set; }
        public bool? DisplayAsTextBox { get; set; }
        public int QItemSortId { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdatedBy { get; set; }
        public string ShortenedText { get; set; }

        //public SurveyQuestionDTO SurveyQuestion { get; set; }
    }
}
