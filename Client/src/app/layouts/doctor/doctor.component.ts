import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-doctor',
    template: '<router-outlet></router-outlet>'
})
export class DoctorComponent implements OnInit {
    constructor(public router: Router) { }

    ngOnInit() {
        if (this.router.url === '/doctor') {
            this.router.navigate(['/dashboard']);
        }
    }
}