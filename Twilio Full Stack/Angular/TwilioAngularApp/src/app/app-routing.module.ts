import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SMSComponent } from './sms/sms.component';
import { ScheduleSmsComponent } from './schedule-sms/schedule-sms.component';

const routes: Routes = [
  { path: '', component: SMSComponent },
  { path: 'schedule-sms', component: ScheduleSmsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
