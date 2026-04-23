import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
