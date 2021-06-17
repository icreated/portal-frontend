import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
/**
 * application state service
 */
export class ApplicationStateService implements OnInit {

  windowSize$ = new BehaviorSubject(this.getWindowSize());

  constructor() {
    this.windowSize$.pipe(
      distinctUntilChanged());

    fromEvent(window, 'resize')
      .pipe(map(this.getWindowSize))
      .subscribe(this.windowSize$);
  }


  ngOnInit(): void {
  }

  getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };


  public getIsMobileResolution(): Observable<boolean> {
    return this.windowSize$.pipe(
      map(win => win.width <= 992)
    );
  }

}
