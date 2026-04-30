import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ProgressBarModule} from 'primeng/progressbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {HeaderComponent} from './header/header.component';
import {DockerSidebarComponent} from './docker-sidebar/docker-sidebar.component';
import {LoaderService} from '@core/services/loader.service';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css'],
    standalone: true,
    imports: [RouterOutlet, AsyncPipe, ProgressBarModule, ConfirmDialogModule, ToastModule, HeaderComponent, DockerSidebarComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  isLoading$ = inject(LoaderService).getStatus();

  css = 'ng-content-docked';

  setCss(css: string) {
    this.css = css;
  }

}
