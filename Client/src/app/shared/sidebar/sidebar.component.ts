import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'ap-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, AfterViewInit {
    private user: { name: string, picture: any };

    constructor(public router: Router, public domSanitizer: DomSanitizer, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.user = { name: "", picture: "" };
        const user = JSON.parse(localStorage.getItem('account'));
        if (user.role === 'hospital') this.user.name = user.name;
        else this.user.name = `${user.firstname} ${user.lastname}`;
        this.user.picture = this.domSanitizer.bypassSecurityTrustUrl(user.picture);
    }

    ngAfterViewInit() {
        $(function () {

            $(".sidebartoggler").on('click', function () {
                if ($("body").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible");
                    $("body").removeClass("mini-sidebar");
                    $('.navbar-brand span').show();
                    //$(".sidebartoggler i").addClass("ti-menu");
                }
                else {
                    $("body").trigger("resize");
                    $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                    $("body").addClass("mini-sidebar");
                    $('.navbar-brand span').hide();
                    //$(".sidebartoggler i").removeClass("ti-menu");
                }
            });


            var url = window.location.toString();
            var element = $('ul#sidebarnav li').filter(function () {
                let a = <HTMLAnchorElement>this;
                return (a.href == url ? true : false);
            }).addClass('active').parent().addClass('active');
            while (true) {
                if (element.is('li')) {
                    element = element.parent().addClass('in').parent().addClass('active');
                }
                else {
                    break;
                }
            }

            (<any>$('#sidebarnav')).metisMenu();
        });
    }

    logout() {
        this.authenticationService.logout()
            .subscribe(result => {
                if (result.success) this.router.navigate(['/login']);
                else {
                    console.log(result);
                }
            });
    }
}
