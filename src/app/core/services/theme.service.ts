import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
/**
 * Theme provider service
 */
export class ThemeService {

  private theme: BehaviorSubject<string> = new BehaviorSubject<string>('theme-teal');

  /**
   *
   * @param value on selecting theme set theme variable globally
   */
  selectTheme(value: string) {
      this.theme.next(value);
  }

  getTheme(): Observable<string> {
      return this.theme.asObservable();
  }
}
