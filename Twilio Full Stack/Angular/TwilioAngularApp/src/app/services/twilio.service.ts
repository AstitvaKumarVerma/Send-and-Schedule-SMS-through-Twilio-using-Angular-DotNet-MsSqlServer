import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {

  private apiUrl = 'https://localhost:7045/api/Twilio/send-sms-directly';

  constructor(private http: HttpClient) { }

  sendSms(toPhoneNumber: string, message: string) {
    return this.http.post(this.apiUrl, { toPhoneNumber, message });
  }
}
