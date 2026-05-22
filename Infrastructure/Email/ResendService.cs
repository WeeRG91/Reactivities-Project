using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Infrastructure.Email;

public class ResendService(HttpClient httpClient, IConfiguration config) : IEmailService
{
    private readonly string _apiKey = config["Resend:ApiToken"]!;

    public async Task SendEmailAsync(string to, string subject, string htmlBody)
    {
        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _apiKey);

        var payload = new
        {
            from = "noreply@resend.dev",
            to = new[] { to },
            subject,
            html = htmlBody
        };

        var content = new StringContent(
            JsonSerializer.Serialize(payload),
            Encoding.UTF8,
            "application/json"
        );

        var response = await httpClient.PostAsync(
            "https://api.resend.com/emails",
            content
        );

        response.EnsureSuccessStatusCode();
    }
}