using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using ReactAppNetCore.Server.Models;

namespace ReactAppNetCore.Server.Repositories
{
    public class FormDBContext : DbContext
    {
        public FormDBContext(DbContextOptions<FormDBContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Control>()
                .HasKey(c => new { c.templateId, c.fieldNo });
            modelBuilder.Entity<Control>().Property(c => c.taskData).HasColumnType("json");

            modelBuilder.Entity<Answer>().Property(c => c.answerData).HasColumnType("json");

            modelBuilder.Entity<User>().HasIndex(c => c.username).IsUnique();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Control> Controls { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Template> Templates { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
