import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {
    public user: { username: string, email: string, password1: string, password2: string, role: string };

    constructor(public router: Router, private authenticationService: AuthenticationService) {
        this.user = { username: "", email: "", password1: "", password2: "", role: "user" }
    }

    ngOnInit() {
        this.authenticationService.logout();
    }

    ngAfterViewInit() {
        $(function () {
            $(".preloader").fadeOut();
        });
        $(function () {
            (<any>$('[data-toggle="tooltip"]')).tooltip()
        });
    }

    signup() {
        this.authenticationService.signup(this.user)
            .subscribe(result => {
                if (result.success) this.router.navigate(['/']);
                else {
                    console.log(result);
                }
            });
    }
}
