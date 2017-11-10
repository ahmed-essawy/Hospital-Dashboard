import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../services/http.service';


@Component({
    selector: 'app-doctor-profile',
    templateUrl: './doctor-profile.component.html',
    styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit, AfterViewInit {
    doctor;
    // picture;

    constructor(public router: Router, public routerActivated: ActivatedRoute
        , public domSanitizer: DomSanitizer, private http: HttpService) {
        //this.doctor={};
    }

    ngOnInit() {
        this.routerActivated.params
            .subscribe((doctorId) => {
                this.http.get('api/doctor/' + doctorId.id).subscribe(doctor => {
                    this.doctor = doctor
                    //console.log(this.doctor);
                });
            });
        //this.picture = this.domSanitizer.bypassSecurityTrustUrl(this.doctor.picture)

    }

    ngAfterViewInit() { }

    favorite() {
        this.http.post('api/user/favorite', this.doctor)
            .subscribe(result => {
                console.log(result);
                // if (result.success) {
                //     console.log(this.doctor);

                // }
            });;
    }

}