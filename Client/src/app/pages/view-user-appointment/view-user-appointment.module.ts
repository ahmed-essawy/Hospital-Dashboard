import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ViewUserAppointmentComponent } from './view-user-appointment.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'View User Appointment Page',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'View User Appointment Page' }]
    },
    component: ViewUserAppointmentComponent
}];


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ViewUserAppointmentComponent]
})
export class ViewUserAppointmentModule { }