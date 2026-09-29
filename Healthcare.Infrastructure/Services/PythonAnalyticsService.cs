using System.Net.Http.Json;
using Healthcare.Application.DTOs;
using Healthcare.Application.Interfaces;

namespace Healthcare.Infrastructure.Services;

public class PythonAnalyticsService : IPythonAnalyticsService
{
    private readonly HttpClient _httpClient;

    public PythonAnalyticsService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<PatientAnalyticsResponseDto> GetPatientSummaryAsync(
        PatientAnalyticsRequestDto request)
    {
        var response = await _httpClient.PostAsJsonAsync(
            "/api/analytics/patient-summary",
            request);

        response.EnsureSuccessStatusCode();

        var result =
            await response.Content.ReadFromJsonAsync<PatientAnalyticsResponseDto>();

        return result
            ?? throw new InvalidOperationException(
                "Python analytics service returned an empty response.");
    }
}