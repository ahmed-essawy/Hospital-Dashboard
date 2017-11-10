import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../../../services/http.service';


@Component({
    selector: 'app-user-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.css']
})

export class AppointmentsComponent implements OnInit, AfterViewInit {
    user;

    constructor(public router: Router, public domSanitizer: DomSanitizer, private http: HttpService) {
        this.user = {};
    }

    ngOnInit() {
        this.http.get('api/account').subscribe(account => {
            this.user = account;
            this.user.name = account.name || account.firstname + " " + account.lastname;
            console.log(this.user);
        });
    }

    ngAfterViewInit() { }
}