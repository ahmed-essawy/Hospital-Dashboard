import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { HospitalComponent } from './components/hospital/hospital.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent,
        AppointmentComponent,
        AppointmentsComponent,
        DoctorComponent,
        DoctorsComponent,
        HospitalComponent,
        HospitalsComponent
    ]
})
export class UserModule { }