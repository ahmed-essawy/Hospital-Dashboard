import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hospital',
    template: '<router-outlet></router-outlet>'
})
export class HospitalComponent implements OnInit {
    constructor(public router: Router) { }

    ngOnInit() {
        if (this.router.url === '/hospital') {
            this.router.navigate(['/dashboard']);
        }
    }
}