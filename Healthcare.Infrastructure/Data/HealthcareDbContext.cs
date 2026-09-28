using Healthcare.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Healthcare.Infrastructure.Data;

public class HealthcareDbContext : DbContext
{
    public HealthcareDbContext(DbContextOptions<HealthcareDbContext> options)
        : base(options)
    {
    }

    public DbSet<PatientEntity> Patients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PatientEntity>(entity =>
        {
            entity.ToTable("Patients");

            entity.HasKey(p => p.PatientId);

            entity.Property(p => p.FirstName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(p => p.LastName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(p => p.Gender)
                .HasMaxLength(20);

            entity.Property(p => p.Phone)
                .HasMaxLength(25);

            entity.Property(p => p.Email)
                .HasMaxLength(150);

            entity.Property(p => p.Address)
                .HasMaxLength(500);

            entity.Property(p => p.CreatedBy)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(p => p.UpdatedBy)
                .HasMaxLength(100);
        });
    }
}