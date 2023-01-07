import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ThemeChooserComponent} from './theme-chooser.component';
import {ThemeService} from '../../../core/services/theme.service';
import {SessionService} from '../../../core/services/session.service';
import {TranslateModule} from '@ngx-translate/core';
import {DesignTemplate} from "../../../core/models/design-template.model";


describe('ThemeChooserComponent', () => {
    let component: ThemeChooserComponent;
    let fixture: ComponentFixture<ThemeChooserComponent>;
    let sessionService: SessionService;
    let themeService: ThemeService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ThemeChooserComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [SessionService, ThemeService],
            imports: [TranslateModule.forRoot()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThemeChooserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        sessionService = TestBed.inject(SessionService);
        themeService = TestBed.inject(ThemeService);
    });

    describe('selectTheme', () => {
        it('should save theme in session', () => {
            const theme = {fontFamily: 'Robotic'} as DesignTemplate;
            spyOn(sessionService, 'setItem');
            spyOn(themeService, 'selectTheme');

            component.selectTheme(theme);
            expect(sessionService.setItem).toHaveBeenCalled();
            expect(themeService.selectTheme).toHaveBeenCalled();
        });
    });
});
