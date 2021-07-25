import {TestBed} from '@angular/core/testing';

import {DashboardDataService} from './dashboard-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {OpenItem} from '../../core/models/open-item.model';

describe('DashboardDataService', () => {
    let service: DashboardDataService;
    let httpMock: HttpTestingController;

    const item1 = {} as OpenItem;
    const item2 = {} as OpenItem;
    const openItems = [item1, item2];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(DashboardDataService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getOpenItemList', () => {
        it('should return given number of OpenItems', (done: DoneFn) => {
            service.getOpenItemList()
                .subscribe((items) => {
                    expect(items.length).toBe(2);
                    done();
                });
            const req = httpMock.expectOne(`${environment.apiUrl}/invoices/openitems`);
            expect(req.request.method).toBe('GET');
            req.flush(openItems);
        });
    });
});
