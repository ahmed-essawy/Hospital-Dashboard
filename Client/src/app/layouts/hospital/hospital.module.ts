import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        HospitalRoutingModule
    ],
    declarations: [HospitalComponent]
})
export class HospitalModule { }