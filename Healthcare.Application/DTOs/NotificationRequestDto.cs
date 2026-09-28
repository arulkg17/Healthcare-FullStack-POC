namespace Healthcare.Application.DTOs;

public class NotificationRequestDto
{
    public int PatientId { get; set; }

    public string Type { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;
}