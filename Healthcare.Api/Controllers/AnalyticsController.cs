using Healthcare.Application.DTOs;
using Healthcare.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Healthcare.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly IPythonAnalyticsService _analyticsService;

    public AnalyticsController(
        IPythonAnalyticsService analyticsService)
    {
        _analyticsService = analyticsService;
    }

    [HttpPost("patient-summary")]
    public async Task<ActionResult<PatientAnalyticsResponseDto>> GetPatientSummary(
        [FromBody] PatientAnalyticsRequestDto request)
    {
        var result =
            await _analyticsService.GetPatientSummaryAsync(request);

        return Ok(result);
    }
}