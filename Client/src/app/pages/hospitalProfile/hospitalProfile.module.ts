import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HospitalProfileComponent } from './hospitalProfile.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Hospital Profile Page',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'Hospital Profile Page' }]
    },
    component: HospitalProfileComponent
}];


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HospitalProfileComponent]
})
export class HospitalProfileModule { }