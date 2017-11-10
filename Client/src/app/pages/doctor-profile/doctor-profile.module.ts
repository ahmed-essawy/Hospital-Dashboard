import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { DoctorProfileComponent } from './doctor-profile.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Doctor Profile Page',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'Doctor Profile Page' }]
    },
    component: DoctorProfileComponent
}];


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DoctorProfileComponent]
})
export class DoctorProfileModule { }