import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
/**
 * loader service
 * toggle loader gif in website
 */
export class LoaderService {

  private status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  show() {
      this.status.next(true);
  }

  hide() {
      this.status.next(false);
  }

  getStatus(): Observable<boolean> {
      return this.status.asObservable();
  }
}
