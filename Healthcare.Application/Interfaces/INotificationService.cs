using Healthcare.Application.DTOs;

namespace Healthcare.Application.Interfaces;

public interface INotificationService
{
    Task<bool> SendNotificationAsync(
        NotificationRequestDto notification);
}