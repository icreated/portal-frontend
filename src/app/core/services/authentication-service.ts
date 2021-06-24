import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


import {User} from '../models/user';
import {environment} from 'src/environments/environment';


@Injectable({providedIn: 'root'})
export class AuthenticationService {

  public currentUser: Observable<User | null>;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
      const storageUser = localStorage.getItem('currentUser');
      const user = storageUser ? JSON.parse(storageUser) as User : null;
      this.currentUserSubject = new BehaviorSubject<User | null>(user);
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/login`, {username, password})
          .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  forgotPassword(email: string) {
      return this.http.post<any>(`${environment.apiUrl}/user/password/emaillink`, {token: email});
  }

  passwordValidate(token: string, password: string, confirmPassword: string) {
      return this.http.post<any>(`${environment.apiUrl}/user/password/validate`,
          {password: token, newPassword: password, confirmPassword});
  }

  changePassword(password: string, newPassword: string, confirmPassword: string) {
      return this.http.post<any>(`${environment.apiUrl}/user/password/change`,
          {password, newPassword, confirmPassword})
          .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }
}
