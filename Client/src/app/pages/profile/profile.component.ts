import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../../services/http.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
    user;
    picture;
    readOnly = true;
    hide = false;
    uploadPhoto = false;
    showEdit = false;
    constructor(public router: Router, public domSanitizer: DomSanitizer, private http: HttpService) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('account'));
        this.picture = this.domSanitizer.bypassSecurityTrustUrl(this.user.picture);
    }

    ngAfterViewInit() {

    }
    uploadPicture(files) {
        this.user.picture = files[0];
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (event: Event) => this.picture = this.domSanitizer.bypassSecurityTrustUrl(event.target['result']);

    }
    edit() {
        this.readOnly = false;
        this.hide = true;
        this.showEdit = false;
        this.uploadPhoto = true;
    }
    save() {
        let formData: FormData = new FormData();
        for (var property in this.user) {
            if (this.user.hasOwnProperty(property)) {
                formData.append(property, this.user[property]);
            }
        }
        this.http.put('api/user/profile', formData)
            .subscribe(result => {
                if (result.success) {
                    this.readOnly = true;
                    this.hide = true;
                    this.uploadPhoto = false;
                    this.showEdit = true;
                    localStorage.setItem('account', JSON.stringify(result.account));
                }
            });;

    }


}