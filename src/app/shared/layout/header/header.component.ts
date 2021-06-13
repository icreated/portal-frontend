import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {SessionService} from 'src/app/core/services/session.service';
import {User} from 'src/app/core/models/user';
import {notification} from 'src/app/core/models/notification.model';
import {UserIdleService} from 'angular-user-idle';
import {MenuDataService} from 'src/app/core/services/menu-data.service';
import {AuthenticationService} from 'src/app/core/services/authentication-service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  displayNotifications: boolean;

  notifications: notification[];

  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private menuDataService: MenuDataService,
    private authenticationService: AuthenticationService) {

    this.displayNotifications = false;

  }

  ngOnInit() {
    this.user = this.sessionService.getItem("currentUser");
    this.notifications = [];
    for (let i = 1; i <= 5; i++) {
      const notificationObj = new notification("Message " + i, new Date(), null)
      this.notifications.push(notificationObj);
    }

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe();

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.logout();
    });
  }

  logout() {
    this.userIdle.stopWatching();
    this.routeStateService.removeAll();
    this.authenticationService.logout();
    this.sessionService.removeItem('active-menu');
    this.router.navigate(['/login']);
  }

  showNotificationSidebar() {
    this.displayNotifications = true;
  }

  toggleMenu() {
    this.menuDataService.toggleMenuBar.next(true);
  }


}
