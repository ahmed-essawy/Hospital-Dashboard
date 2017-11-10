import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layouts-routing.module';
import { SIDEBAR_TOGGLE_DIRECTIVES } from '../shared/sidebar.directive';
import { NAV_DROPDOWN_DIRECTIVES } from '../shared/nav-dropdown.directive';
import { LayoutComponent } from '../shared/layout/layout.component';
import { NavigationComponent } from '../shared/header-navigation/navigation.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RightSidebarComponent } from '../shared/right-sidebar/rightsidebar.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LayoutRoutingModule
    ],
    declarations: [
        LayoutComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
        ProfileComponent,
        DashboardComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        NAV_DROPDOWN_DIRECTIVES
    ]
})
export class LayoutsModule { }
