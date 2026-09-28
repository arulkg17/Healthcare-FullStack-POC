using System.Net.Http.Json;
using Healthcare.Application.DTOs;
using Healthcare.Application.Interfaces;

namespace Healthcare.Infrastructure.Services;

public class NotificationService : INotificationService
{
    private readonly HttpClient _httpClient;

    public NotificationService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<bool> SendNotificationAsync(
        NotificationRequestDto notification)
    {
        var response = await _httpClient.PostAsJsonAsync(
            "/api/notifications",
            notification);

        return response.IsSuccessStatusCode;
    }
}