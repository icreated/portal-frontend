import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RouteStateService} from '@core/services/route-state.service';
import {TranslateService} from '@ngx-translate/core';
import {from} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-header-breadcrumb',
    templateUrl: 'header-breadcrumb.component.html',
    styleUrls: ['header-breadcrumb.component.css'],
    standalone: true,
    imports: [BreadcrumbModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderBreadcrumbComponent implements OnInit {

  private routeStateService = inject(RouteStateService);
  private translationService = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);

  items: MenuItem[] = [];
  home: MenuItem = {icon: 'pi pi-home', routerLink: ['/main/dashboard']};

  ngOnInit() {
      const routes = this.routeStateService.getAll();
      from(routes).pipe(
          mergeMap(route => this.translationService.get(route.title).pipe(
              map(title => ({id: route.id, title}))
          )),
      ).subscribe(route => {
          this.items.push({
              label: route.title, command: () => {
                  this.onClickBreadcrumb(route.id);
              }
          });
          this.cdr.markForCheck();
      });
  }

  onClickBreadcrumb(id: number) {
      this.routeStateService.loadById(id);
  }
}
