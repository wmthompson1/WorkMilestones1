using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreWebAPI.Models
{
    public class SurveyTransactionUpdateDTO
    {
        //  This is a DTO for editing, so no id here.
        public int Id { get; set; }
        public int NextId { get; set; }
        public int BatchId { get; set; }
        public string LeaverYear { get; set; }
        public int CopyFromId { get; set; }
    }
}
