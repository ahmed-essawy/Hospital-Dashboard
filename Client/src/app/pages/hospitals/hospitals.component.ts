import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../services/http.service';


@Component({
    selector: 'app-hospitals',
    templateUrl: './hospitals.component.html',
    styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, AfterViewInit {
    hospitals;
    hospital;

    constructor(public router: Router, public domSanitizer: DomSanitizer, private http: HttpService) {
        this.http.get('api/hospital')
            .subscribe(result => {
                    this.hospitals=result
                    console.log(this.hospitals);
            });
    }

    ngOnInit() {}

    ngAfterViewInit() {}

}