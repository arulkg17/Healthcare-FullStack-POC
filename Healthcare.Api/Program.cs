using Healthcare.Application.Interfaces;
using Healthcare.Application.Services;
using Healthcare.Infrastructure.Data;
using Healthcare.Infrastructure.Repositories;
using Healthcare.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// OpenAPI
builder.Services.AddOpenApi();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<HealthcareDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("HealthcareDb")));

// Dependency Injection
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IPatientService, PatientService>();

builder.Services.AddHttpClient<INotificationService, NotificationService>(client =>
{
    client.BaseAddress = new Uri("http://localhost:3000");
});

builder.Services.AddHttpClient<IPythonAnalyticsService, PythonAnalyticsService>(client =>
{
    client.BaseAddress = new Uri("http://localhost:8000");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    // Swagger UI
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Keep HTTP for our local POC
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();