using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


/**************************************************************************************
PURPOSE:   


					DATE		COMMENT
--------------------------------------------
William Thompson	3/01/2017	Created.

**************************************************************************************/

namespace AspNetCoreWebAPI.Entities
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [NotMapped]
        public string FullName { get { return FirstName + " " + LastName; } }
        public virtual List<EmployeeProject> EmployeeProject { get; set; }
    }

    public class Project
    {
        [Key]
        public int ProlectId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public decimal Budget { get; set; }
        public virtual List<EmployeeProject> EmployeeProject { get; set; }
    }

    public class EmployeeProject
    {
        public int ProlectId { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public Project Project { get; set; }
    }
}
