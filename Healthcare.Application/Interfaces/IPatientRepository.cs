using Healthcare.Domain.Entities;

namespace Healthcare.Application.Interfaces;

public interface IPatientRepository
{
    Task<IEnumerable<PatientEntity>> GetAllAsync();

    Task<PatientEntity?> GetByIdAsync(int patientId);

    Task<PatientEntity> CreateAsync(PatientEntity patient);

    Task<PatientEntity?> UpdateAsync(PatientEntity patient);

    Task<bool> DeleteAsync(int patientId);
}