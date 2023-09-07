import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SMSComponent } from './sms/sms.component';
import { FormsModule } from '@angular/forms';
import { TwilioService } from './services/twilio.service';
import { ScheduleSmsComponent } from './schedule-sms/schedule-sms.component';

@NgModule({
  declarations: [
    AppComponent,
    SMSComponent,
    ScheduleSmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TwilioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
