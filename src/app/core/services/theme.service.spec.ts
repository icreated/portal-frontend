import {TestBed} from '@angular/core/testing';
import {ThemeService} from './theme.service';


describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set & get same theme', () => {
        const themeName = 'toto';
        service.selectTheme(themeName);
        service.getTheme()
            .subscribe((theme) => expect(theme).toEqual(themeName));
    });

});
