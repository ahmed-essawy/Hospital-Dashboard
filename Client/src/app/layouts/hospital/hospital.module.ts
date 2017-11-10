import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';

@NgModule({
    imports: [
        CommonModule,
        HospitalRoutingModule
    ],
    declarations: [HospitalComponent]
})
export class HospitalModule { }