import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication-service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../models/user';
import {environment} from '../../../environments/environment';


describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let httpMock: HttpTestingController;
    let store = {} as any;
    let navigateSpy: jasmine.Func;
    const currentUser = {
        id: 100,
        username: 'orwell',
        firstName: 'George',
        lastName: 'Orwell',
        password: 'orwell',
        token: 'qwerty123456789'
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
            service.login(currentUser.username, currentUser.password).subscribe(user => {
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
            service.login(currentUser.username, currentUser.password).subscribe(user => {
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

    describe('forgotPassword', () => {
        it('should call http and return empty body', () => {
            const email = 'george.orwell@example.com';
            service.forgotPassword(email)
                .subscribe((res: any) => {
                    expect(res).toEqual('');
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/user/password/emaillink`);
            expect(req.request.method).toBe('POST');
            req.flush('');
        });
    });

    describe('passwordValidate', () => {
        it('should call http and return empty body', () => {
            const email = 'george.orwell@example.com';
            service.forgotPassword(email)
                .subscribe((res: any) => {
                    expect(res).toEqual('');
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/user/password/emaillink`);
            expect(req.request.method).toBe('POST');
            req.flush('');
        });
    });

    describe('changePassword', () => {
        it('should call http and return connected User', () => {
            const password = 'GardenUser';
            const newPassword = 'GardenAdmin';
            service.changePassword(password, newPassword, newPassword)
                .subscribe((user: User) => {
                    expect(user).toEqual(currentUser);
                    expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(currentUser));
                    expect(service.currentUserValue).toEqual(currentUser);
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/user/password/change`);
            expect(req.request.method).toBe('POST');
            req.flush(currentUser);
        });
    });


});
