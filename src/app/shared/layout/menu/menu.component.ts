import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { CustomMenuItem } from 'src/app/core/models/menu-item.model';
import { MenuDataService } from 'src/app/core/services/menu-data.service';
import { ApplicationStateService } from 'src/app/core/services/application-state.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {

    items: CustomMenuItem[];
    selectedItem: string;
    visible: boolean;

    constructor(private routeStateService: RouteStateService,
        private sessionService: SessionService,
        private menuDataService: MenuDataService,
        private applicationStateService: ApplicationStateService) { }

    ngOnInit() {
        this.items = this.menuDataService.getMenuList();

        let that = this;
        this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
            if (data) {
                that.visible = !that.visible;
            }
        });

        this.visible = !this.applicationStateService.getIsMobileResolution();
        const activeMenu = this.sessionService.getItem("active-menu");
        this.selectedItem = activeMenu ? activeMenu : "Home"
    }

    ngOnDestroy() {
        this.menuDataService.toggleMenuBar.observers.forEach(function (element) { element.complete(); });
    }

    // on menu click event
    onMenuClick(menu: CustomMenuItem) {
        // if child are available then open child
        if (menu.Childs != undefined || menu.Childs != null) {
            this.toggleSubMenu(menu);
            return;
        }
        if (menu.RouterLink == undefined || menu.RouterLink == "") {
            this.routeStateService.add("Error 404", "/error", null, false);
            return;
        }
        this.selectedItem = menu.Label;
        this.sessionService.setItem("active-menu", menu.Label);
        this.routeStateService.add(menu.Label, menu.RouterLink, null, true);
        // hide menu bar after menu click for mobile layout
        setTimeout(() => {
            if (this.applicationStateService.getIsMobileResolution()) {
                this.visible = false;
            }
        }, 100);
    }

    // toggle sub menu on click
    toggleSubMenu(menu: CustomMenuItem) {
        menu.IsChildVisible = !menu.IsChildVisible;
    }

}
