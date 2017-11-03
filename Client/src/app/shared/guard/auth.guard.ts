import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        const localAccount = localStorage.getItem('account');
        const account: any = localAccount ? JSON.parse(localAccount) : {};

        if (!account.id) this.router.navigate(['/login']);
        return account.id ? true : false;
    }
}
