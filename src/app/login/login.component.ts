import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
    public user: { username: string, password: string, remember: boolean };

    constructor(public router: Router, private authenticationService: AuthenticationService) {
        this.user = { username: "", password: "", remember: true };
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
        $('#to-recover').on("click", function () {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
    }

    login() {
        this.authenticationService.login(this.user)
            .subscribe(result => {
                if (result.success) this.router.navigate(['/']);
                else {
                    console.log(result);
                }
            });
    }

}