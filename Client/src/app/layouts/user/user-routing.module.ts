import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            {
                path: 'appointment/:id', component: AppointmentComponent,
                data: { title: 'Appointment', urls: [{ title: 'User', url: '/' }, { title: 'Appointments', url: '/appointments' }, { title: 'Doctor' }] }
            },
            {
                path: 'appointments', component: AppointmentsComponent,
                data: { title: 'Appointments', urls: [{ title: 'User', url: '/' }, { title: 'Appointments' }] }
            },
            {
                path: 'doctor/:id', component: DoctorComponent,
                data: { title: 'Doctor', urls: [{ title: 'User', url: '/' }, { title: 'Doctors', url: '/doctors' }, { title: 'Doctor' }] }
            },
            {
                path: 'doctors', component: DoctorsComponent,
                data: { title: 'Doctors', urls: [{ title: 'User', url: '/' }, { title: 'Doctors' }] }
            },
            {
                path: 'hospital/:id', component: HospitalComponent,
                data: { title: 'Hospital', urls: [{ title: 'User', url: '/' }, { title: 'Hospitals', url: '/hospitals' }, { title: 'Doctor' }] }
            },
            {
                path: 'hospitals', component: HospitalsComponent,
                data: { title: 'Hospitals', urls: [{ title: 'User', url: '/' }, { title: 'Hospitals' }] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }