using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Models
{
    public class SurveyTransactionDTO
    {
        public int Id { get; set; }
        public int NextId { get; set; }
        public int BatchId { get; set; }
        public string LeaverYear { get; set; }
        public int CopyFromId { get; set; }

    }
}
