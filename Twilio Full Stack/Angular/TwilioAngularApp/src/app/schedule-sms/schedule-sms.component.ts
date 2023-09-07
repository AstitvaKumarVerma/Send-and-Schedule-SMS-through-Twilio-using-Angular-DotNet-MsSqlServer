import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-sms',
  templateUrl: './schedule-sms.component.html',
  styleUrls: ['./schedule-sms.component.css']
})
export class ScheduleSmsComponent {


  toPhoneNumber = '';
  message = '';
  scheduledTime = ''; // Assuming you have a date input

  constructor(private http: HttpClient) { }

  sendSms() {    
    
    const datePipe = new DatePipe('en-US');
    const formattedScheduledTime = datePipe.transform(this.scheduledTime, 'dd-MM-yyyy HH:mm');

    const request = {
      toPhoneNumber: this.toPhoneNumber,
      message: this.message,
      scheduledTime: formattedScheduledTime, // Use the formatted time
      // messageType: this.messageType
    };


    // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
    this.http.post('https://localhost:7045/api/Twilio/send-scheduled-sms', request)
      .subscribe(
        () => {
          alert('Scheduled SMS sent successfully.');
          // You can reset the form fields here
        },
        error => {
          console.error('Error sending SMS:', error);
          alert('Error sending SMS. Please try again.');
        }
      );
  }

}
