import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {User} from '../../api/models/user';


@Injectable({providedIn: 'root'})
export class AuthenticationService {

    public currentUserSubject: BehaviorSubject<User | null>;

    constructor(private http: HttpClient) {
        const storageUser = localStorage.getItem('currentUser');
        const user = storageUser ? JSON.parse(storageUser) as User : null;
        this.currentUserSubject = new BehaviorSubject<User | null>(user);
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public get currentUser(): Observable<User | null> {
        return this.currentUserSubject.asObservable();
    }

    login(username: string, password: string): Observable<User> {
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
}
