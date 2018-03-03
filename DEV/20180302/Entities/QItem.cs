using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


/**************************************************************************************
PURPOSE:   created view QItem
	related entity	Question - > QuestionId 

					DATE		COMMENT
--------------------------------------------
William Thompson	2/26/2017	Created.

**************************************************************************************/

namespace AspNetCoreWebAPI.Entities
{
    // map to QuestionItem; this version has QItem in naming
    [Table("QItem", Schema = "test")]
    public class QItem
    {
        [Key]
        public int QItemId { get; set; }
        [StringLength(1500)]
        public string QItemText { get; set; }

        [ForeignKey("QuestionId")]
        public int QuestionId { get; set; }

        [StringLength(50)]
        public string ItemNumberText { get; set; }
        [StringLength(20)]
        public string ItemNumberDisplayText { get; set; }
        public bool? DisplayAsTextBox { get; set; }
        public int QItemSortId { get; set; }
        [DataType(DataType.Date)]
        public DateTime? CreateDate { get; set; }
        public string CreatedBy { get; set; }
        [DataType(DataType.Date)]
        public DateTime? UpdateDate { get; set; }
        [StringLength(50)]
        public string UpdatedBy { get; set; }
        [StringLength(100)]
        public string ShortenedText { get; set; }

        public SurveyQuestion SurveyQuestion { get; set; }
    }
}
