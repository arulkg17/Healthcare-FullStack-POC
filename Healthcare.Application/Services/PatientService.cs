using Healthcare.Application.DTOs;
using Healthcare.Application.Interfaces;
using Healthcare.Domain.Entities;

namespace Healthcare.Application.Services;

public class PatientService : IPatientService
{
    private readonly IPatientRepository _patientRepository;

    public PatientService(IPatientRepository patientRepository)
    {
        _patientRepository = patientRepository;
    }

    public async Task<IEnumerable<PatientDto>> GetAllAsync()
    {
        var patients = await _patientRepository.GetAllAsync();

        return patients.Select(MapToDto);
    }

    public async Task<PatientDto?> GetByIdAsync(int patientId)
    {
        var patient = await _patientRepository.GetByIdAsync(patientId);

        return patient == null ? null : MapToDto(patient);
    }

    public async Task<PatientDto> CreateAsync(PatientDto patientDto)
    {
        var entity = MapToEntity(patientDto);

        entity.CreatedDate = DateTime.UtcNow;
        entity.IsDeleted = false;

        var createdEntity = await _patientRepository.CreateAsync(entity);

        return MapToDto(createdEntity);
    }

    public async Task<PatientDto?> UpdateAsync(
        int patientId,
        PatientDto patientDto)
    {
        var existingEntity =
            await _patientRepository.GetByIdAsync(patientId);

        if (existingEntity == null)
        {
            return null;
        }

        existingEntity.FirstName = patientDto.FirstName;
        existingEntity.LastName = patientDto.LastName;
        existingEntity.DateOfBirth = patientDto.DateOfBirth;
        existingEntity.Gender = patientDto.Gender;
        existingEntity.Phone = patientDto.Phone;
        existingEntity.Email = patientDto.Email;
        existingEntity.Address = patientDto.Address;
        existingEntity.IsActive = patientDto.IsActive;

        existingEntity.UpdatedDate = DateTime.UtcNow;

        var updatedEntity =
            await _patientRepository.UpdateAsync(existingEntity);

        return updatedEntity == null
            ? null
            : MapToDto(updatedEntity);
    }

    public async Task<bool> DeleteAsync(int patientId)
    {
        return await _patientRepository.DeleteAsync(patientId);
    }
    public async Task<IEnumerable<PatientDto>> SearchAsync(
    string searchTerm)
    {
        var patients =
            await _patientRepository.SearchAsync(searchTerm);

        return patients.Select(MapToDto);
    }
    public async Task<PatientStatisticsDto> GetStatisticsAsync()
    {
        return await _patientRepository.GetStatisticsAsync();
    }
    private static PatientEntity MapToEntity(PatientDto dto)
    {
        return new PatientEntity
        {
            PatientId = dto.PatientId,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            DateOfBirth = dto.DateOfBirth,
            Gender = dto.Gender,
            Phone = dto.Phone,
            Email = dto.Email,
            Address = dto.Address,
            IsActive = dto.IsActive
        };
    }

    private static PatientDto MapToDto(PatientEntity entity)
    {
        return new PatientDto
        {
            PatientId = entity.PatientId,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            DateOfBirth = entity.DateOfBirth,
            Gender = entity.Gender,
            Phone = entity.Phone,
            Email = entity.Email,
            Address = entity.Address,
            IsActive = entity.IsActive
        };
    }
    
}