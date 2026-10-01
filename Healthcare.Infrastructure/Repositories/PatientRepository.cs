using Healthcare.Application.DTOs;
using Healthcare.Application.Interfaces;
using Healthcare.Domain.Entities;
using Healthcare.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Healthcare.Infrastructure.Repositories;

public class PatientRepository : IPatientRepository
{
    private readonly HealthcareDbContext _context;

    public PatientRepository(HealthcareDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PatientEntity>> GetAllAsync()
    {
        return await _context.Patients
            .Where(p => !p.IsDeleted)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<PatientEntity?> GetByIdAsync(int patientId)
    {
        return await _context.Patients
            .FirstOrDefaultAsync(p =>
                p.PatientId == patientId &&
                !p.IsDeleted);
    }

    public async Task<PatientEntity> CreateAsync(PatientEntity patient)
    {
        await _context.Patients.AddAsync(patient);
        await _context.SaveChangesAsync();

        return patient;
    }

    public async Task<PatientEntity?> UpdateAsync(PatientEntity patient)
    {
        var existingPatient = await _context.Patients
            .FirstOrDefaultAsync(p =>
                p.PatientId == patient.PatientId &&
                !p.IsDeleted);

        if (existingPatient == null)
        {
            return null;
        }

        existingPatient.FirstName = patient.FirstName;
        existingPatient.LastName = patient.LastName;
        existingPatient.DateOfBirth = patient.DateOfBirth;
        existingPatient.Gender = patient.Gender;
        existingPatient.Phone = patient.Phone;
        existingPatient.Email = patient.Email;
        existingPatient.Address = patient.Address;
        existingPatient.IsActive = patient.IsActive;
        existingPatient.UpdatedBy = patient.UpdatedBy;
        existingPatient.UpdatedDate = patient.UpdatedDate;

        await _context.SaveChangesAsync();

        return existingPatient;
    }

    public async Task<bool> DeleteAsync(int patientId)
    {
        var patient = await _context.Patients
            .FirstOrDefaultAsync(p =>
                p.PatientId == patientId &&
                !p.IsDeleted);

        if (patient == null)
        {
            return false;
        }

        // Soft delete
        patient.IsDeleted = true;
        patient.IsActive = false;
        patient.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
    public async Task<IEnumerable<PatientEntity>> SearchAsync(
    string searchTerm)
    {
        searchTerm = searchTerm.Trim();

        return await _context.Patients
            .Where(p =>
                !p.IsDeleted &&
                (
                    p.FirstName.Contains(searchTerm) ||
                    p.LastName.Contains(searchTerm) ||
                    p.Email.Contains(searchTerm) ||
                    p.Phone.Contains(searchTerm)
                ))
            .AsNoTracking()
            .ToListAsync();
    }
    public async Task<PatientStatisticsDto> GetStatisticsAsync()
    {
        var patients = await _context.Patients
            .Where(p => !p.IsDeleted)
            .AsNoTracking()
            .ToListAsync();

        return new PatientStatisticsDto
        {
            TotalPatients = patients.Count,
            ActivePatients = patients.Count(p => p.IsActive),
            InactivePatients = patients.Count(p => !p.IsActive)
        };
    }
}