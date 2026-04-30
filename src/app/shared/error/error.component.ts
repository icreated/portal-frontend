import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    standalone: true,
    imports: [RouterLink, ButtonModule, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  history = history;
}
