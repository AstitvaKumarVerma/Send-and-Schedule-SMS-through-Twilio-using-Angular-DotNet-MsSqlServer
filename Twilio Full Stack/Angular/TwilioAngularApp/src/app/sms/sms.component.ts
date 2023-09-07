import { Component } from '@angular/core';
import { TwilioService } from '../services/twilio.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SMSComponent {
  toPhoneNumber: string = '';
  message: string = '';

  constructor(private twilioService: TwilioService) { }

  sendSms() {
    this.twilioService.sendSms(this.toPhoneNumber, this.message).subscribe(() => {
      alert('SMS sent successfully!');
    }, (error) => {
      console.error('Error sending SMS:', error);
    });
  }
}
