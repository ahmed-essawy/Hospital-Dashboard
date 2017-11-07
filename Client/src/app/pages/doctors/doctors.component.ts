import { Component, OnInit, AfterViewInit,Output } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../services/http.service';


@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.css']
})

export class DoctorsComponent implements OnInit, AfterViewInit {
    doctors;
   // @Output()
    doctor;

    constructor(public router: Router, public domSanitizer: DomSanitizer, private http: HttpService) {
        this.http.get('api/doctor')
            .subscribe(result => {
                    this.doctors=result
            });
    }

    ngOnInit() {}

    ngAfterViewInit() {}

}