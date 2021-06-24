import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {SessionService} from 'src/app/core/services/session.service';
import {CustomMenuItem} from 'src/app/core/models/menu-item.model';
import {MenuDataService} from 'src/app/core/services/menu-data.service';
import {ApplicationStateService} from 'src/app/core/services/application-state.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  items: CustomMenuItem[] = [];
  selectedItem = '';
  visible = true;

  constructor(private routeStateService: RouteStateService,
              private sessionService: SessionService,
              private menuDataService: MenuDataService,
              private applicationStateService: ApplicationStateService) {
  }


  ngOnInit() {
      this.items = this.menuDataService.getMenuList();
      const that = this;
      this.menuDataService.toggleMenuBar.subscribe((data: any) => {
          if (data) {
              that.visible = !that.visible;
          }
      });

      this.applicationStateService.getIsMobileResolution()
          .subscribe(isMobile => this.visible = !isMobile);

      const activeMenu = this.sessionService.getItem('active-menu');
      this.selectedItem = activeMenu ? activeMenu : 'Home';
  }

  // on menu click event
  onMenuClick(menu: CustomMenuItem) {
      // if child are available then open child
      if ((menu.childs) || (menu.childs)) {
          this.toggleSubMenu(menu);
          return;
      }
      if (!menu.routerLink) {
          this.routeStateService.add('Error 404', '/error', null, false);
          return;
      }
      this.selectedItem = menu.label;
      this.sessionService.setItem('active-menu', menu.label);
      this.routeStateService.add(menu.label, menu.routerLink, null, true);
      // hide menu bar after menu click for mobile layout
      setTimeout(() => {
          this.applicationStateService.getIsMobileResolution()
              .subscribe(isMobile => this.visible = !isMobile);
      }, 100);
  }


  // toggle sub menu on click
  toggleSubMenu(menu: CustomMenuItem) {
      menu.isChildVisible = !menu.isChildVisible;
  }


  ngOnDestroy() {
      this.menuDataService.toggleMenuBar.observers
          .forEach(element => element.complete());
  }

}
