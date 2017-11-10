import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { DoctorsComponent } from './components/doctors/doctors.component';

const routes: Routes = [
    {
        path: 'user', component: UserComponent,
        children: [
            {
                path: 'doctors', component: DoctorsComponent,
                data: { title: 'Doctors', urls: [{ title: 'User', url: '/' }, { title: 'Doctors' }] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }