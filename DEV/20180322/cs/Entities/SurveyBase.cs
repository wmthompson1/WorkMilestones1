using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Entities
{
    [Table("SurveyBase", Schema = "test")]
    public class SurveyBase
    {

        [Required]
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(3000)]
        public string Description { get; set; }

        [StringLength(50)]
        public string SurveyTypeCode { get; set; }

        [StringLength(3000)]
        public string Instructions { get; set; }

        public bool IsLocked { get; set; }

        [DataType(DataType.Date)]
        public DateTime? CloseDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? CreateDate { get; set; }

        [StringLength(50)]
        public string CreatedBy { get; set; }

        [DataType(DataType.Date)]
        public DateTime? UpdateDate { get; set; }

        [StringLength(50)]
        public string UpdatedBy { get; set; }

        [StringLength(7)]
        public string SchoolYear { get; set; }

        [StringLength(7)]
        public string LeaverYear { get; set; }

        public bool? IsReported { get; set; }

        [DataType(DataType.Date)]
        public DateTime? OpenDate { get; set; }

        [StringLength(500)]
        public string TokenizedName { get; set; }

        public bool? IsCurrent { get; set; }

        public int? CopyFromId { get; set; }
    }
}
