using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Models
{
    public class SurveyBaseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string SurveyTypeCode { get; set; }
        public string Instructions { get; set; }

        public bool? IsLocked { get; set; }
        public DateTime? CloseDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdateDate { get; set; }

        public string UpdatedBy { get; set; }
        public string SchoolYear { get; set; }
        public string LeaverYear { get; set; }
        public bool? IsReported { get; set; }
        public DateTime? OpenDate { get; set; }

        public string TokenizedName { get; set; }
        public bool? IsCurrent { get; set; }
        public int? CopyFromId { get; set; }

    }
}
