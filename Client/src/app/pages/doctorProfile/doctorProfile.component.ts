import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../services/http.service';


@Component({
    selector: 'app-doctorProfile',
    templateUrl: './doctorProfile.component.html',
    styleUrls: ['./doctorProfile.component.css']
})
export class DoctorProfileComponent implements OnInit, AfterViewInit {
    doctor;
    picture;
    newReview;
    user;
    private sub: any;

    constructor(public router: Router, public routerActivated: ActivatedRoute
        , public domSanitizer: DomSanitizer, private http: HttpService) {

    }

    ngOnInit() {

        this.routerActivated.params
            .subscribe((doctorId) => {
                this.http.get('api/doctor/' + doctorId.id).subscribe(doctor => {
                    this.doctor = doctor
                });
            });
        this.picture = this.domSanitizer.bypassSecurityTrustUrl(this.doctor.picture)

    }

    ngAfterViewInit() { }

    review() {
        console.log(this.newReview);
        this.http.post('api/doctor/addReview', this.doctor)
            .subscribe(result => {
                console.log(result);
                if (result.success) {
                    console.log(this.newReview);
                    this.user = JSON.parse(localStorage.getItem('account'));
                    console.log(this.user);
                    // this.doctor.reviews.add({userId:this.user._id,review:this.newReview});
                    // console.log( this.doctor);

                }
            });;
    }

}