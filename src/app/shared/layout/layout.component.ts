import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {DockerSidebarComponent} from './docker-sidebar/docker-sidebar.component';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css'],
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, DockerSidebarComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  css = 'ng-content-docked';

  setCss(css: string) {
    this.css = css;
  }

}
