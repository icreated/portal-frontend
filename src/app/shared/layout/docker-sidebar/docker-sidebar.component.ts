import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {SessionService} from 'src/app/core/services/session.service';
import {CustomMenuItem} from 'src/app/core/models/menu-item.model';
import {MenuDataService} from 'src/app/core/services/menu-data.service';
import {ApplicationStateService} from 'src/app/core/services/application-state.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'docker-sidebar',
    templateUrl: 'docker-sidebar.component.html',
    styleUrls: ['docker-sidebar.component.css'],
    animations: [
    trigger('openDocked', [
        state('docked', style({
            width: '50px',
            })),
        state('open', style({
            width: '12rem',
            })),
        transition('docked => open', [
            animate('.1s')
            ]),
        transition('open => docked', [
            animate('.1s')
            ]),
        ]),
    ],
    })
export class DockerSidebarComponent implements OnInit {

  @Input() isMobile = false;
  @Output() cssEvent = new EventEmitter<string>();
  items: CustomMenuItem[] = [];
  selectedItem = '';
  isMenuOpened = false;
  isMenuDocked = true;
  isTitleShowed = false;

  constructor(private routeStateService: RouteStateService, private sessionService: SessionService,
              private menuDataService: MenuDataService, private applicationStateService: ApplicationStateService) {
  }


  ngOnInit() {
      this.items = this.menuDataService.getMenuList();

      this.menuDataService.toggleMenuBar.subscribe(isMenuOpened => {
          this.isMenuDocked = false;
          this.isTitleShowed = true;
          this.isMenuOpened = isMenuOpened;
          this.cssEvent.next(isMenuOpened ? 'ng-content-hidden' : 'ng-content-overlay');
      });

      this.menuDataService.dockMenuBar.subscribe(isMenuDocked => {
          if (this.isMobile) {
              this.isMenuOpened = true;
          } else {
              this.isMenuOpened = false;
              this.cssEvent.next( isMenuDocked ? 'ng-content-docked' : 'ng-content');
          }
          this.isMenuDocked = isMenuDocked;
          this.isTitleShowed = false;
          if (!this.isMenuDocked) {
              setTimeout(() => {
                  this.isTitleShowed = true;
              }, 100);
          }
      });

      this.applicationStateService.isMobileResolution().subscribe(isMobile => {
          this.isMobile = isMobile;
          if (this.isMobile) {
              this.isMenuOpened = true;
              this.isTitleShowed = false;
              this.isMenuDocked = false;
              this.cssEvent.next('ng-content-hidden');
          } else {
              if (this.isMenuOpened) {
                  this.menuDataService.dockMenuBar.next(true);
              }
              this.isMenuOpened = false;
              this.isTitleShowed = !this.isMenuDocked;
              this.isMenuDocked = true;
              this.cssEvent.next(this.isMenuDocked ? 'ng-content-docked' : 'ng-content');
          }
      });

      const activeMenu = this.sessionService.getItem('active-menu');
      this.selectedItem = activeMenu ? activeMenu : 'Home';
  }

  // on menu click event
  onMenuClick(menu: CustomMenuItem) {
      // if child are available then open child
      if (menu.childs) {
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
          this.applicationStateService.isMobileResolution()
              .pipe(
                  filter(isMobile => isMobile)
              ).subscribe(isMobile => {
                  this.menuDataService.toggleMenuBar.next(true);
              });
      }, 100);
  }


  // toggle sub menu on click
  toggleSubMenu(menu: CustomMenuItem) {
      menu.isChildVisible = !menu.isChildVisible;
  }

}
