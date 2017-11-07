import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HospitalsComponent } from './hospitals.component';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Hospitals Page',
        urls: [{ title: 'Dashboard', url: '/' }, { title: 'Hospitals Page' }]
    },
    component: HospitalsComponent
}];


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HospitalsComponent]
})
export class HospitalsModule { }