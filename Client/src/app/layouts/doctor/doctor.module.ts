import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';

@NgModule({
    imports: [
        CommonModule,
        DoctorRoutingModule
    ],
    declarations: [DoctorComponent]
})
export class UserModule { }