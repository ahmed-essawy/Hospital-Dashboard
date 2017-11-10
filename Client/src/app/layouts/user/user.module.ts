import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DoctorsComponent } from './components/doctors/doctors.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        UserRoutingModule
    ],
    declarations: [UserComponent, DoctorsComponent]
})
export class UserModule { }