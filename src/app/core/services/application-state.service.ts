import {Injectable} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class ApplicationStateService {

    windowSize$ = new BehaviorSubject(this.getWindowSize());

    constructor() {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(100),
                map(() => this.getWindowSize()),
                distinctUntilChanged((a, b) => a.width === b.width)
            )
            .subscribe(this.windowSize$);
    }


    getWindowSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }


    public isMobileResolution(): Observable<boolean> {
        return this.windowSize$.pipe(
            map(win => win.width <= 992)
        );
    }

}
