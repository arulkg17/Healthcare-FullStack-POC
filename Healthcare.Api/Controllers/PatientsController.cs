using Healthcare.Application.DTOs;
using Healthcare.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Healthcare.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IPatientService _patientService;

    public PatientsController(IPatientService patientService)
    {
        _patientService = patientService;
    }

    // GET: api/patients
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PatientDto>>> GetAll()
    {
        var patients = await _patientService.GetAllAsync();

        return Ok(patients);
    }

    // GET: api/patients/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<PatientDto>> GetById(int id)
    {
        var patient = await _patientService.GetByIdAsync(id);

        if (patient == null)
        {
            return NotFound();
        }

        return Ok(patient);
    }

    // POST: api/patients
    [HttpPost]
    public async Task<ActionResult<PatientDto>> Create(
        [FromBody] PatientDto patient)
    {
        var createdPatient = await _patientService.CreateAsync(patient);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdPatient.PatientId },
            createdPatient);
    }

    // PUT: api/patients/1
    [HttpPut("{id:int}")]
    public async Task<ActionResult<PatientDto>> Update(
        int id,
        [FromBody] PatientDto patient)
    {
        var updatedPatient =
            await _patientService.UpdateAsync(id, patient);

        if (updatedPatient == null)
        {
            return NotFound();
        }

        return Ok(updatedPatient);
    }

    // DELETE: api/patients/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _patientService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}