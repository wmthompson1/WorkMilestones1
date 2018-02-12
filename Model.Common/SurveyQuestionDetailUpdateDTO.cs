using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CCTS.TSF.Model.Common
{
    public class SurveyQuestionDetailUpdateDTO
    {
        [Required(ErrorMessage = "You must enter an Id.")]
        //  [Key]
        //  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        

        public Int64 Id { get; set; }
        public int SurveyId { get; set; }
        public string SurveyName { get; set; }
        public int PageId { get; set; }
        public string PageName { get; set; }

        public int QuestionId { get; set; }
        public string QuestionGroupId { get; set; }
        public string Text { get; set; }
        public string QuestionTypeCode { get; set; }
        public string QuestionNumberText { get; set; }

        public bool IsRequired { get; set; }
        public bool Visible { get; set; }
        public decimal QuestionSortId { get; set; }
        public string instructions { get; set; }
        public decimal PageSortId { get; set; }

        public string LeaverYear { get; set; }
        public string SurveyTypeCode { get; set; }

    }
}
