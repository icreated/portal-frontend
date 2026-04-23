import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
}
