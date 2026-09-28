using Healthcare.Application.DTOs;

namespace Healthcare.Application.Interfaces;

public interface IPatientService
{
    Task<IEnumerable<PatientDto>> GetAllAsync();

    Task<PatientDto?> GetByIdAsync(int patientId);

    Task<PatientDto> CreateAsync(PatientDto patient);

    Task<PatientDto?> UpdateAsync(int patientId, PatientDto patient);

    Task<bool> DeleteAsync(int patientId);
}