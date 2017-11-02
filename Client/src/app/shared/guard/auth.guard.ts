import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        const loggedIn: boolean = localStorage.getItem('loggedIn') === "true";

        if (!loggedIn) this.router.navigate(['/login']);
        return loggedIn;
    }
}
