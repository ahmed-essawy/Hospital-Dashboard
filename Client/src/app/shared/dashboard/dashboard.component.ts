import { Component, AfterViewInit } from '@angular/core';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	subtitle: string;
	constructor() {
		this.subtitle = "This is dashboard."
	}

	ngAfterViewInit() { }
}