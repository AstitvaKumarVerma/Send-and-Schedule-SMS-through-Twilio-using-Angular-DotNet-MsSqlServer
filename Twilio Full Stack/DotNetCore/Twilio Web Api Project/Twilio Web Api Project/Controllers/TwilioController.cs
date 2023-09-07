using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using Twilio_Web_Api_Project.Model;
using Twilio_Web_Api_Project.Services;

namespace Twilio_Web_Api_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwilioController : ControllerBase
    {
        private readonly TwilioService _twilioService;

        public TwilioController(TwilioService twilioService)
        {
            _twilioService = twilioService;
        }

        [HttpPost("send-sms-directly")]
        public IActionResult SendSms([FromBody] SmsRequestModel request)
        {
            _twilioService.SendSms(request.ToPhoneNumber, request.Message);
            return Ok();
        }

        [HttpPost("send-scheduled-sms")]
        public IActionResult SendScheduledSms([FromBody] ScheduledSmsRequestModel request)
        {
            _twilioService.SendScheduledSms(request);
            return Ok();
        }

    }
}
