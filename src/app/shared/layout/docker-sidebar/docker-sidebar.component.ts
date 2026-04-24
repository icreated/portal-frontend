import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, output} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouteStateService} from '@core/services/route-state.service';
import {SessionService} from '@core/services/session.service';
import {CustomMenuItem} from '@core/models/menu-item.model';
import {MenuDataService} from '@core/services/menu-data.service';
import {ApplicationStateService} from '@core/services/application-state.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-docker-sidebar',
    templateUrl: 'docker-sidebar.component.html',
    styleUrls: ['docker-sidebar.component.css'],
    standalone: true,
    imports: [NgClass, NgTemplateOutlet, TranslateModule],
    animations: [
        trigger('dockedOpen', [
            state('true', style({ width: '50px' })),
            state('false', style({ width: '12rem' })),
            transition('true => false', [animate('.1s')]),
            transition('false => true', [animate('.1s')]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerSidebarComponent implements OnInit {

  private routeStateService = inject(RouteStateService);
  private sessionService = inject(SessionService);
  private menuDataService = inject(MenuDataService);
  private applicationStateService = inject(ApplicationStateService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  cssEvent = output<string>();
  isMobile = false;
  items: CustomMenuItem[] = [];
  selectedItem = '';
  isMenuOpened = false;
  isMenuDocked = true;
  isTitleShowed = false;

  ngOnInit() {
      this.items = this.menuDataService.getMenuList();

      this.menuDataService.toggleMenuBar
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(menuState => {
              if (this.isMobile) {
                this.isMenuOpened = !menuState.isMenuOpened;
                this.isMenuDocked = false;
                this.cssEvent.emit(this.isMenuOpened ? 'ng-content-hidden' : 'ng-content-overlay');
              } else {
                this.isMenuOpened = menuState.isMenuOpened;
                this.isMenuDocked = menuState.isMenuDocked;
                this.cssEvent.emit(menuState.isMenuDocked ? 'ng-content-docked' : 'ng-content');
              }
              this.isTitleShowed = false;
              if (!this.isMenuDocked) {
                setTimeout(() => {
                  this.isTitleShowed = true;
                  this.cdr.markForCheck();
                }, 100);
              }
              this.cdr.markForCheck();
          });

      this.applicationStateService.isMobileResolution()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(isMobile => {
              this.isMobile = isMobile;
              if (this.isMobile) {
                  this.isMenuOpened = true;
                  this.isTitleShowed = false;
                  this.isMenuDocked = false;
                  this.cssEvent.emit('ng-content-hidden');
              } else {
                  if (this.isMenuOpened) {
                      this.menuDataService.toggleMenuBar.next({ isMenuOpened: false, isMenuDocked: false });
                  }
                  this.isMenuOpened = false;
                  this.isTitleShowed = !this.isMenuDocked;
                  this.cssEvent.emit(this.isMenuDocked ? 'ng-content-docked' : 'ng-content');
              }
              this.cdr.markForCheck();
          });

      const activeMenu = this.sessionService.getItem('active-menu');
      this.selectedItem = activeMenu ? activeMenu : 'Home';
  }

  onMenuClick(menu: CustomMenuItem) {
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
      if (this.isMobile) {
          this.menuDataService.toggleMenuBar.next({ isMenuOpened: false, isMenuDocked: this.isMenuDocked });
      }
  }

  toggleSubMenu(menu: CustomMenuItem) {
      menu.isChildVisible = !menu.isChildVisible;
      this.cdr.markForCheck();
  }

}
