import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {SessionService} from 'src/app/core/services/session.service';
import {MenuDataService} from 'src/app/core/services/menu-data.service';
import {AuthenticationService} from '../../../core/services/authentication-service';
import {ApplicationStateService} from '../../../core/services/application-state.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
    })
export class HeaderComponent implements OnInit {

  displayNotifications: boolean;
  isDocked = true;
  isMobile = false;

  constructor(private router: Router, private routeStateService: RouteStateService,
              private sessionService: SessionService, private applicationStateService: ApplicationStateService,
              private menuDataService: MenuDataService, private authenticationService: AuthenticationService) {
      this.displayNotifications = false;
  }

  ngOnInit(): void {
       this.menuDataService.toggleMenuBar.subscribe(menuState => this.isDocked = menuState.isMenuDocked);
    this.applicationStateService.isMobileResolution().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }

  logout() {
      this.routeStateService.removeAll();
      this.authenticationService.logout();
      this.sessionService.removeItem('active-menu');
      this.router.navigate(['/login']);
  }

  showNotificationSidebar() {
      this.displayNotifications = true;
  }

  toggleMenu() {
    let menuState = this.menuDataService.toggleMenuBar.value;
    menuState.isMenuDocked = !menuState.isMenuDocked;
    if (this.isMobile) {
      menuState.isMenuOpened = !menuState.isMenuOpened;
    }
    //
    this.menuDataService.toggleMenuBar.next(menuState);
  }
}
