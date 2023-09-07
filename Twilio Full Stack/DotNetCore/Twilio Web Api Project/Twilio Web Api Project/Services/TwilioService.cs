using Twilio.Types;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio_Web_Api_Project.Model;
using System.Globalization;

namespace Twilio_Web_Api_Project.Services
{
    public class TwilioService
    {
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly ILogger<TwilioService> _logger; // Add logger as a private field

        public TwilioService(string accountSid, string authToken, ILogger<TwilioService> logger)
        {
            _accountSid = accountSid;
            _authToken = authToken;
            _logger = logger;

            TwilioClient.Init(_accountSid, _authToken);
        }

        public void SendSms(string toPhoneNumber, string message)
        {
            var to = new PhoneNumber(toPhoneNumber);
            var from = new PhoneNumber("+16562231054");

            MessageResource.Create(
                to: to,
                from: from,
                body: message
            );
        }

        public void SendScheduledSms(ScheduledSmsRequestModel request)
        {
            // Parse the ScheduledTime string into a DateTime using the custom format
            DateTime scheduledTime;
            if (DateTime.TryParseExact(request.ScheduledTime, "dd-MM-yyyy HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.None, out scheduledTime))
            {
                // Check if the scheduled time is in the future
                if (scheduledTime > DateTime.Now)
                {
                    // Calculate the delay
                    var delay = scheduledTime - DateTime.Now;

                    // Use a background task or scheduler library to schedule the SMS
                    // For simplicity, we'll use Task.Delay here (not recommended for production)
                    Task.Delay(delay).Wait();

                    var to = new PhoneNumber(request.ToPhoneNumber);
                    var from = new PhoneNumber("+16562231054");

                    MessageResource.Create(
                        to: to,
                        from: from,
                        body: request.Message
                    );

                    // Log a success message
                    _logger.LogInformation($"Scheduled SMS for {request.ToPhoneNumber} with message '{request.Message}' sent successfully at {scheduledTime}");
                }
                else
                {
                    // Handle the case where the scheduled time is in the past
                    // Log an error or take appropriate action
                    _logger.LogError($"Scheduled SMS for {request.ToPhoneNumber} with message '{request.Message}' was not sent because the scheduled time is in the past.");
                    // You can also return a BadRequest or another appropriate status code here
                }
            }
            else
            {
                // Handle the case where the ScheduledTime string cannot be parsed
                // Log an error or take appropriate action
                _logger.LogError($"Error parsing ScheduledTime: {request.ScheduledTime}");
                // You can also return a BadRequest or another appropriate status code here
            }
        }

    }
}
