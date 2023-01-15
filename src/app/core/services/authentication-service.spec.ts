import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication-service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {User} from '../../api/models/user';


describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let httpMock: HttpTestingController;
    let store = {} as any;
    const currentUser = {
        id: 100,
        username: 'orwell',
        name: 'George',
    } as User;
    let currentUserSubject;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        store = {} as any;
        spyOn(localStorage, 'getItem').and.callFake((key) => store[`${key}`]);
        spyOn(localStorage, 'setItem').and.callFake((key, value) => store[`${key}`] = value + '');
        spyOn(localStorage, 'removeItem').and.callFake((key) => {
            delete store[`${key}`];
        });
        service = TestBed.inject(AuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('currentUserValue', () => {
        it('should be null when not logged', () => {
            expect(service.currentUserValue).toBeNull();
        });
    });

    describe('login', () => {
        it('should login and put User to localStorage', () => {
            service.login(currentUser.username, "orwell").subscribe(user => {
                expect(user).toEqual(currentUser);
                expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(currentUser));
                expect(service.currentUserValue).toEqual(currentUser);
            });
            const req = httpMock.expectOne(`${environment.apiUrl}/login`);
            expect(req.request.method).toBe('POST');
            req.flush(currentUser);
        });
    });

    describe('logout', () => {
        it('should clean Observable currentUser', () => {
            service.login(currentUser.username, "orwell").subscribe(user => {
                expect(user).toEqual(currentUser);
            });
            const req = httpMock.expectOne(`${environment.apiUrl}/login`);
            expect(req.request.method).toBe('POST');
            req.flush(currentUser);
            service.logout();
            service.currentUser.subscribe(user => {
                expect(user).toBeNull();
            });
        });

        it('should clean storage', () => {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            expect(localStorage.getItem('currentUser')).toBeDefined();
            service.logout();
            expect(localStorage.getItem('currentUser')).toBeUndefined();
        });
    });

});
