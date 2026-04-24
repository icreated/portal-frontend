import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {SessionService} from '@core/services/session.service';
import {MenuDataService} from '@core/services/menu-data.service';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {RouteStateService} from '@core/services/route-state.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routeStateService: RouteStateService;
  let sessionService: SessionService;
  let menuDataService: MenuDataService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [HeaderComponent,
            TranslateModule.forRoot()],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideAnimations(), provideRouter([]), SessionService, MenuDataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    sessionService = TestBed.inject(SessionService);
    menuDataService = TestBed.inject(MenuDataService);
    routeStateService = TestBed.inject(RouteStateService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
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
      spyOn(routeStateService, 'removeAll');
      spyOn(sessionService, 'removeItem');

      component.logout();
      expect(routeStateService.removeAll).toHaveBeenCalled();
      expect(sessionService.removeItem).toHaveBeenCalledWith('active-menu');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('toggleMenu', () => {
    it('should get false', () => {
      component.toggleMenu();
      menuDataService.toggleMenuBar.subscribe((result) => {
        expect(result.isMenuDocked).toBeFalsy();
      });
    });
  });
});
