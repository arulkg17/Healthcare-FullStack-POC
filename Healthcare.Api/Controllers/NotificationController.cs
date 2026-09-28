using Healthcare.Application.DTOs;
using Healthcare.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Healthcare.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationsController(
        INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> Send(
        [FromBody] NotificationRequestDto notification)
    {
        var success =
            await _notificationService.SendNotificationAsync(notification);

        if (!success)
        {
            return StatusCode(
                StatusCodes.Status502BadGateway,
                new
                {
                    success = false,
                    message = "Notification service is unavailable."
                });
        }

        return Ok(new
        {
            success = true,
            message = "Notification sent successfully."
        });
    }
}