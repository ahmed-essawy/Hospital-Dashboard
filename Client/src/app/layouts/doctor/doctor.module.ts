import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        DoctorRoutingModule
    ],
    declarations: [DoctorComponent]
})
export class DoctorModule { }