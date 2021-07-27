import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {SessionService} from '../../../core/services/session.service';
import {MenuDataService} from '../../../core/services/menu-data.service';
import {AuthenticationService} from '../../../core/services/authentication-service';
import {AppCommonModule} from '../../../app.common.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {UserIdleModule, UserIdleService} from 'angular-user-idle';
import {Router} from '@angular/router';
import {RouteStateService} from '../../../core/services/route-state.service';


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let routeStateService: RouteStateService;
    let sessionService: SessionService;
    let menuDataService: MenuDataService;
    let authenticationService: AuthenticationService;
    let userIdle: UserIdleService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [SessionService, MenuDataService, AuthenticationService],
            imports: [AppCommonModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([]),
                HttpClientTestingModule, TranslateModule.forRoot(), UserIdleModule.forRoot({idle: 1, timeout: 1})]
        }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        sessionService = TestBed.inject(SessionService);
        menuDataService = TestBed.inject(MenuDataService);
        authenticationService = TestBed.inject(AuthenticationService);
        routeStateService = TestBed.inject(RouteStateService);
        userIdle = TestBed.inject(UserIdleService);
        router = TestBed.inject(Router);
        spyOn(router, 'navigate');
    });

    afterEach(() => {
        if(userIdle) {
            userIdle.stopWatching();
        }
    });

    describe('onInit', () => {
        it('shouldn\'t disconnect before 1 second', () => {
            spyOn(component, 'logout');
            component.ngOnInit();
            expect(component.logout).not.toHaveBeenCalled();
        });
    });

    describe('logout', () => {
        it('should logout', () => {
            spyOn(userIdle, 'stopWatching');
            spyOn(routeStateService, 'removeAll');
            spyOn(authenticationService, 'logout');
            spyOn(sessionService, 'removeItem');

            component.logout();
            expect(userIdle.stopWatching).toHaveBeenCalled();
            expect(routeStateService.removeAll).toHaveBeenCalled();
            expect(authenticationService.logout).toHaveBeenCalled();
            expect(sessionService.removeItem).toHaveBeenCalledWith('active-menu');
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        });
    });

    describe('toggleMenu', () => {
        it('should get true', () => {
            component.toggleMenu();
            menuDataService.toggleMenuBar.subscribe((result) => {
                expect(result).toBeTruthy();
            });
        });
    });
});
