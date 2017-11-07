import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service'

@Component({
    selector: 'app-layout',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PageComponent implements OnInit {
    currentAccount = {};

    constructor(public router: Router, private http: HttpService) { }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/starter']);
        }
        // Wrong logic
        this.currentAccount = this.http.get('api/account');
    }

}
