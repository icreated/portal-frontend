import {ChangeDetectionStrategy, Component} from '@angular/core';
import {environment} from '@env/environment';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css'],
    standalone: true,
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  version = environment.version;

}
