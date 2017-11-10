import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    template: '<router-outlet></router-outlet>'
})
export class UserComponent implements OnInit {
    constructor(public router: Router) { }

    ngOnInit() {
        if (this.router.url === '/user') {
            this.router.navigate(['/dashboard']);
        }
    }
}