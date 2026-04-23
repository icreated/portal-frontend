import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {SessionService} from 'src/app/core/services/session.service';
import {MenuDataService} from 'src/app/core/services/menu-data.service';
import {AuthenticationService} from '../../../core/services/authentication-service';
import {ApplicationStateService} from '../../../core/services/application-state.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  private router = inject(Router);
  private routeStateService = inject(RouteStateService);
  private sessionService = inject(SessionService);
  private applicationStateService = inject(ApplicationStateService);
  private menuDataService = inject(MenuDataService);
  private authenticationService = inject(AuthenticationService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  displayNotifications = false;
  isDocked = true;
  isMobile = false;

  ngOnInit(): void {
      this.menuDataService.toggleMenuBar
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(menuState => {
              this.isDocked = menuState.isMenuDocked;
              this.cdr.markForCheck();
          });
      this.applicationStateService.isMobileResolution()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(isMobile => {
              this.isMobile = isMobile;
              this.cdr.markForCheck();
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
    this.menuDataService.toggleMenuBar.next(menuState);
  }
}
