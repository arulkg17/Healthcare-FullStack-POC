namespace Healthcare.Application.DTOs;

public class PatientAnalyticsRequestDto
{
    public List<PatientAnalyticsDto> Patients { get; set; } = [];
}

public class PatientAnalyticsDto
{
    public int PatientId { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}