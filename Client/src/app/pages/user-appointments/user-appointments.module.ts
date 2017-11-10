import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UserAppointmentsComponent } from './user-appointments.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'User Appointments Page',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'User Appointments Page' }]
    },
    component: UserAppointmentsComponent
}];


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [UserAppointmentsComponent]
})
export class UserAppointmentsModule { }