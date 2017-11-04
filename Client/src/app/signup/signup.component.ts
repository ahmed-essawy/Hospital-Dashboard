import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {
    public user: { username: string, email: string, password1: string, password2: string, role: string, firstname: string, lastname: string, picture: File };

    constructor(public router: Router, private authenticationService: AuthenticationService) {
        this.user = { username: "", email: "", password1: "", password2: "", role: "user", firstname: "", lastname: "", picture: null };
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
        let formData: FormData = new FormData();
        for (var property in this.user) {
            if (this.user.hasOwnProperty(property)) {
                formData.append(property, this.user[property]);
            }
        }
        this.authenticationService.signup(formData)
            .subscribe(result => {
                if (result.id) this.router.navigate(['/']);
            });
    }
}
