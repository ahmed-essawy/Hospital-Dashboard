import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../../../services/http.service';


@Component({
    selector: 'app-user-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, AfterViewInit {
    appointment;
    newReview;

    constructor(public router: Router, public routerActivated: ActivatedRoute
        , public domSanitizer: DomSanitizer, private http: HttpService) {


    }

    ngOnInit() {
        this.routerActivated.params
            .subscribe((appointmentId) => {
                this.http.get('api/appointment/' + appointmentId.id).subscribe(appointment => {
                    this.appointment = appointment
                });
            });

    }

    ngAfterViewInit() { }

    review() {
        console.log(this.newReview);
        this.http.post('api/appointment/review', this.newReview)
            .subscribe(result => {
                console.log(result);
                if (result.success) {
                    //console.log(this.newReview);

                }
            });;
    }

}