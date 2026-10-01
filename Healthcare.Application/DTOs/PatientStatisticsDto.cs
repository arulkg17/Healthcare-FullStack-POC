namespace Healthcare.Application.DTOs;

public class PatientStatisticsDto
{
    public int TotalPatients { get; set; }
    public int ActivePatients { get; set; }
    public int InactivePatients { get; set; }
}