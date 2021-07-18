import { TestBed } from '@angular/core/testing';

import { ApplicationStateService } from './application-state.service';
import {of} from 'rxjs';

describe('ApplicationStateService', () => {
    let service: ApplicationStateService;
    const WIDTH_MOBILE = 992;
    const HEIGHT = 1600;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ApplicationStateService);
        spyOnProperty(window, 'innerWidth').and.returnValue(WIDTH_MOBILE);
        spyOnProperty(window, 'innerHeight').and.returnValue(HEIGHT);
        (service.windowSize$ as any) = of({width: WIDTH_MOBILE, height: HEIGHT});
    });

    describe('getWindowSize', () => {
        it('should return window width and height', () => {
            expect(service.getWindowSize().width).toBe(WIDTH_MOBILE);
            expect(service.getWindowSize().height).toBe(HEIGHT);
        });
    });

    describe('isMobileResolution', () => {
        it('should check window Width to be true if less then 992 px', () => {
            service.isMobileResolution().subscribe((isMobile) => expect(isMobile).toBeTruthy());
        });
    });

});
