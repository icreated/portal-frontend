import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SettingsComponent} from './settings.component';
import {SessionService} from '@core/services/session.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let sessionService: SessionService;
    let translateService: TranslateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsComponent, TranslateModule.forRoot(), RouterTestingModule.withRoutes([])],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [SessionService, MessageService,
                provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        sessionService = TestBed.inject(SessionService);
        translateService = TestBed.inject(TranslateService);
    });

    describe('on Init', () => {
        it('should get language from sessionService', () => {
            spyOn(sessionService, 'getItem').and.returnValue('fr');
            fixture = TestBed.createComponent(SettingsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component.selectedLang).toEqual('fr');
        });
    });

    describe('onChangeLang', () => {
        it('should get language from sessionService', () => {
            const event = {value: 'fr'};
            spyOn(translateService, 'use');
            spyOn(sessionService, 'setItem');
            component.onChangeLang(event);
            expect(translateService.use).toHaveBeenCalled();
            expect(sessionService.setItem).toHaveBeenCalled();
        });
    });
});
