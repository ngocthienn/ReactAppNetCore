using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace ReactAppNetCore.Server.Models;
public class DBTemplate : DbContext
{
    public DBTemplate(DbContextOptions<DBTemplate> options) : base(options)
    {
        
    }
    
    public DbSet<Template> templates { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Template>()
            .Property(e => e.data)
            .HasColumnType("jsonb");
    }
}

public class Template
{
    public int id { get; set; }
    public int id_control { get; set; }
    public JsonDocument data { get; set; }
    public int position { get; set; }
}