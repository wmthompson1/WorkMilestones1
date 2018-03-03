using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Entities
{

    [Table("SurveyQuestion", Schema = "test")]
    public class SurveyQuestion
    {

        public int SurveyId { get; set; }

        [StringLength(500)]
        public string SurveyName { get; set; }

        public int PageId { get; set; }

        [StringLength(500)]
        public string PageName { get; set; }

        public int QuestionId { get; set; }

        [StringLength(50)]
        public string QuestionGroupId { get; set; }

        [StringLength(1500)]
        public string Text { get; set; }

        [StringLength(10)]
        public string QuestionTypeCode { get; set; }

        [StringLength(50)]
        public string QuestionNumberText { get; set; }

        public bool? IsRequired { get; set; }

        public bool? Visible { get; set; }

        public decimal? QuestionSortId { get; set; }

        [StringLength(2000)]
        public string Instructions { get; set; }

        public decimal? PageSortId { get; set; }

        [StringLength(7)]
        public string LeaverYear { get; set; }

        [StringLength(50)]
        public string SurveyTypeCode { get; set; }

        public ICollection<QItem> QItem { get; set; } = new List<QItem>();


    }
}
