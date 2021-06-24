import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {TranslateService} from '@ngx-translate/core';
import {from} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-header-breadcrumb',
    templateUrl: 'header-breadcrumb.component.html',
    styleUrls: ['header-breadcrumb.component.css']
})
export class HeaderBreadcrumbComponent implements OnInit {

  items: MenuItem[] = [];
  home: MenuItem = {icon: 'pi pi-home', routerLink: ['/main/dashboard']};


  constructor(private routeStateService: RouteStateService, private translationService: TranslateService) {
  }

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
      });
  }

  onClickBreadcrumb(id: number) {
      this.routeStateService.loadById(id);
  }
}
