using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWebAPI.Entities
{

    public class SqlDbContext : DbContext
    {

        public DbSet<Survey> Survey { get; set; }
        public DbSet<SurveyQuestionDetail> SurveyQuestionDetail { get; set; }
        public DbSet<SurveyQuestion> SurveyQuestion { get; set; }
        public DbSet<QItem> QItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SurveyQuestionDetail>()
                .HasKey(t => new { t.SurveyId, t.PageId, t.QuestionId });


            modelBuilder.Entity<SurveyQuestion>()
                .HasKey(t => new { t.QuestionId });


            //**MANY-TO-MANY pattern; SurveyQuestion ->1 -- >8 QItem

            modelBuilder.Entity<QItem>(entity =>
            {

                entity.HasOne(d => d.SurveyQuestion)
                    .WithMany(p => p.QItem)
                    .HasForeignKey(d => d.QuestionId);
            });


        }

        public SqlDbContext(DbContextOptions<SqlDbContext> options)
        : base(options)
        {
        }


    }
}
