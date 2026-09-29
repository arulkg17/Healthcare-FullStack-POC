using Healthcare.Application.DTOs;

namespace Healthcare.Application.Interfaces;

public interface IPythonAnalyticsService
{
    Task<PatientAnalyticsResponseDto> GetPatientSummaryAsync(
        PatientAnalyticsRequestDto request);
}