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
    trigger('dockedOpen', [
        state('true', style({
            width: '50px',
            })),
        state('false', style({
            width: '12rem',
            })),
        transition('true => false', [
            animate('.1s')
            ]),
        transition('false => true', [
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

      this.menuDataService.toggleMenuBar.subscribe(menuState => {
          if (this.isMobile) {
            this.isMenuOpened = !menuState.isMenuOpened;
            this.isMenuDocked = false;
            this.cssEvent.next(this.isMenuOpened ? 'ng-content-hidden' : 'ng-content-overlay');
          } else {
            this.isMenuOpened = menuState.isMenuOpened;
            this.isMenuDocked = menuState.isMenuDocked;
            this.cssEvent.next( menuState.isMenuDocked ? 'ng-content-docked' : 'ng-content');
          }

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
                  this.menuDataService.toggleMenuBar.next({ isMenuOpened: false, isMenuDocked: false});
              }
              this.isMenuOpened = false;
              this.isTitleShowed = !this.isMenuDocked;
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
                  const menuState = { isMenuOpened: false, isMenuDocked: this.isMenuDocked };
                  this.menuDataService.toggleMenuBar.next(menuState);
              });
      }, 100);
  }


  // toggle sub menu on click
  toggleSubMenu(menu: CustomMenuItem) {
      menu.isChildVisible = !menu.isChildVisible;
  }

}
