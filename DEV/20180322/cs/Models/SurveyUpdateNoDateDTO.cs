using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Models
{
    public class SurveyUpdateNoDateDTO
    {
        [Required(ErrorMessage = "You must enter an Id.")]
        //  [Key]
        //  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //  This is a DTO for editing, so no id here.
        //  public int Id { get; set; }

        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(3000)]
        public string Description { get; set; }

        [StringLength(50)]
        public string SurveyTypeCode { get; set; }

        [StringLength(3000)]
        public string Instructions { get; set; }

        public bool IsLocked { get; set; }

        //[DataType(DataType.Date)]
        //public DateTime CloseDate { get; set; }

        //[DataType(DataType.Date)]
        //public DateTime CreateDate { get; set; }

        [StringLength(50)]
        public string CreatedBy { get; set; }

        //[DataType(DataType.Date)]
        //public DateTime UpdateDate { get; set; }

        [StringLength(50)]
        public string UpdatedBy { get; set; }

        [StringLength(7)]
        public string SchoolYear { get; set; }

        [StringLength(7)]
        public string LeaverYear { get; set; }

        public bool IsReported { get; set; }

        //[DataType(DataType.Date)]
        //public DateTime OpenDate { get; set; }
    }
}
