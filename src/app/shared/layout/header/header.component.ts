import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {SessionService} from 'src/app/core/services/session.service';
import {MenuDataService} from 'src/app/core/services/menu-data.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  displayNotifications: boolean;
  isDocked = true;

  constructor(private router: Router, private routeStateService: RouteStateService,
              private sessionService: SessionService,
              private menuDataService: MenuDataService) {
    this.displayNotifications = false;
  }

  ngOnInit(): void {
    this.menuDataService.dockMenuBar.subscribe(isDocked => this.isDocked = isDocked);
  }

  logout() {
    this.routeStateService.removeAll();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['/login']);
  }

  showNotificationSidebar() {
    this.displayNotifications = true;
  }

  toggleMenu() {
    this.menuDataService.toggleMenuBar.next(!this.menuDataService.toggleMenuBar.value);
  }

  dockMenu() {
    this.menuDataService.dockMenuBar.next(!this.menuDataService.dockMenuBar.value);
  }
}
