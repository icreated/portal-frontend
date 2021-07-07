import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
    let service: LoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should check the loader is loading', () => {
        service.show();
        service.getStatus()
            .subscribe((status) => expect(status).toBeTruthy());
    });

    it('should check the loader is stopped', () => {
        service.hide();
        service.getStatus()
            .subscribe((status) => expect(status).toBeFalsy());
    });

});
