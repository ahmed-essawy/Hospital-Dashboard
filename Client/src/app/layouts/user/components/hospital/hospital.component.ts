import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../../../services/http.service';


@Component({
    selector: 'app-user-hospital',
    templateUrl: './hospital.component.html',
    styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit, AfterViewInit {
    hospital;
    //picture;
    user;
    private sub: any;

    constructor(public router: Router, public routerActivated: ActivatedRoute, public domSanitizer: DomSanitizer, private http: HttpService) {
   
    }

    ngOnInit() {
        this.routerActivated.params
        .subscribe((hospitalId) => {
            this.http.get('api/hospital/' + hospitalId.id).subscribe(hospital => {
                this.hospital = hospital
            });
        });
    //this.picture = this.domSanitizer.bypassSecurityTrustUrl(this.hospital.picture)
        
    }

    ngAfterViewInit() {}


}