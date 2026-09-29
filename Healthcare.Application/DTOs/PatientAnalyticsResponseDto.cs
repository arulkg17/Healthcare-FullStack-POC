namespace Healthcare.Application.DTOs;

public class PatientAnalyticsResponseDto
{
    public int TotalPatients { get; set; }
    public int ActivePatients { get; set; }
    public int InactivePatients { get; set; }
    public double AverageAge { get; set; }
    public int MaleCount { get; set; }
    public int FemaleCount { get; set; }
}