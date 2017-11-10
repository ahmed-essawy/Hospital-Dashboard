import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../services/http.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.css']
})

export class DoctorsComponent implements OnInit, AfterViewInit {
    doctors;
    doctor;
    model: NgbDateStruct;
    time : NgbTimeStruct;
    meridian = true;

    toggleMeridian() {
        this.meridian = !this.meridian;
    }


    constructor(public router: Router, public domSanitizer: DomSanitizer, private http: HttpService) {
        this.http.get('api/doctor')
            .subscribe(result => {
                this.doctors = result
            });
    }

    ngOnInit() { }

    ngAfterViewInit() { }
}