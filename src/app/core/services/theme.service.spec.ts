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

    it('should return a non-empty themes list', () => {
        expect(service.getThemes().length).toBeGreaterThan(0);
    });

    it('should apply theme without throwing', () => {
        const theme = service.getThemes()[0];
        expect(() => service.selectTheme(theme)).not.toThrow();
    });
});
