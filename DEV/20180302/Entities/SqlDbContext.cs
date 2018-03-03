using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWebAPI.Entities
{
    // 1/22 the entity name here was changed to Survey to match db
    public class SqlDbContext : DbContext
    {

        public DbSet<Survey> Survey { get; set; }
        public DbSet<SurveyQuestionDetail> SurveyQuestionDetail { get; set; }
        public DbSet<SurveyQuestion> SurveyQuestion { get; set; }
        public DbSet<QItem> QItem { get; set; }

        //public DbSet<Employee> Employee { get; set; }
        //public DbSet<Project> Project { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SurveyQuestionDetail>()
                .HasKey(t => new { t.SurveyId, t.PageId, t.QuestionId });

            // The key for the one-to-many has to be 'compatable'

            //modelBuilder.Entity<SurveyQuestion>()
            //    .HasKey(t => new { t.SurveyId, t.PageId, t.QuestionId });

            modelBuilder.Entity<SurveyQuestion>()
                .HasKey(t => new { t.QuestionId });


            //**MANY-TO-MANY pattern; SurveyQuestion ->1 -- > 8 QItem

            modelBuilder.Entity<QItem>(entity =>
            {

                entity.HasOne(d => d.SurveyQuestion)
                    .WithMany(p => p.QItem)
                    .HasForeignKey(d => d.QuestionId);
            });


            //**MANY-TO-MANY SAMPLE lookup pattern [Employee] ->8 --> 1 [Department]
            //modelBuilder.Entity<Employee>(entity =>
            //{
            //    entity.HasIndex(e => e.DepartmentId);

            //    entity.HasOne(d => d.Department)
            //        .WithMany(p => p.Employee)
            //        .HasForeignKey(d => d.DepartmentId);
            //});


            //**MANY-TO-MANY SAMPLE
            //modelBuilder.Entity<EmployeeProject>()
            //   .HasKey(p => new { p.EmployeeId, p.ProlectId });

            //modelBuilder.Entity<EmployeeProject>()
            //            .HasOne(ep => ep.Employee) // Mark Address property optional in Student entity
            //            .WithMany(ad => ad.EmployeeProject) // mark Student property as required in StudentAddress entity. Cannot save StudentAddress without Student
            //            .HasForeignKey(ep => ep.EmployeeId);

            //modelBuilder.Entity<EmployeeProject>()
            //            .HasOne(ep => ep.Project) // Mark Address property optional in Student entity
            //            .WithMany(ad => ad.EmployeeProject) // mark Student property as required in StudentAddress entity. Cannot save StudentAddress without Student
            //            .HasForeignKey(ep => ep.ProlectId);

        }

        public SqlDbContext(DbContextOptions<SqlDbContext> options)
        : base(options)
        {
        }


    }
}
