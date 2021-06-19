import { Component, OnInit } from '@angular/core';
import { MenuDataService } from 'src/app/core/services/menu-data.service';
import { ApplicationStateService } from 'src/app/core/services/application-state.service';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css']
})
export class LayoutComponent implements OnInit {

  isMenuVisible = false;

  constructor(private menuDataService: MenuDataService,
    private applicationStateService: ApplicationStateService) {
  }

  ngOnInit() {
    const that = this;
    this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
      if (data) {
        that.isMenuVisible = !that.isMenuVisible;
      }
    });

    this.applicationStateService.getIsMobileResolution().subscribe(
      isMobile => this.isMenuVisible = !isMobile
    )
  }

  ngOnDestroy() {
    this.menuDataService.toggleMenuBar.observers.forEach(function (element) { element.complete(); });
  }

}
