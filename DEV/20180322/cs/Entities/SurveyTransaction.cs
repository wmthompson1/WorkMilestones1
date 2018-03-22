using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Entities
{
    [Table("SurveyTransaction", Schema = "test")]
    public class SurveyTransaction
    {
        // this becomes next id for put in survey copy process.  And the copy process needs the copyFrom, LeaverYear.  

        [Required]

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int NextId { get; set; }

        public int BatchId { get; set; }

        [StringLength(7)]
        public string LeaverYear { get; set; }

        public int? CopyFromId { get; set; }

    }
}
