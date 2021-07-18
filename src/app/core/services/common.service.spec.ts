import {TestBed} from '@angular/core/testing';
import {CommonService} from './common.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {ValueLabel} from '../models/value-label.model';

describe('CommonService', () => {
    let commonService: CommonService;
    let translateService: TranslateService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TranslateService],
            imports: [HttpClientTestingModule, TranslateModule.forRoot()]
        });
        commonService = TestBed.inject(CommonService);
        translateService = TestBed.inject(TranslateService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    describe('getLang', () => {
        it('should convert en to en_US', () => {
            spyOnProperty(translateService, 'currentLang').and.returnValue('en');
            expect(commonService.getLang()).toEqual('en_US');
        });
    });

    describe('getReferenceDocStatus', () => {
        const value = 'DR';
        const expectedValue = 'DRAFT';
        it('should convert DR to Draft from Idempiere Server', () => {
            spyOn(commonService, 'getLang').and.returnValue('en_US');
            commonService.getReferenceDocStatus(value)
                .subscribe((result) => expect(result).toBe(expectedValue));

            const req = httpMock.expectOne(`${environment.apiUrl}/common/reference/docstatus/${commonService.getLang()}/` + value);
            expect(req.request.method).toBe('GET');
            req.flush(expectedValue);
        });
    });

    describe('getReferenceTenderType', () => {
        const value = 'C';
        const expectedValue = 'Credit Card';
        it('should convert DR to Draft from Idempiere Server', () => {
            spyOn(commonService, 'getLang').and.returnValue('en_US');
            commonService.getReferenceTenderType(value)
                .subscribe((result) => expect(result).toBe(expectedValue));

            const req = httpMock.expectOne(`${environment.apiUrl}/common/reference/tendertype/${commonService.getLang()}/` + value);
            expect(req.request.method).toBe('GET');
            req.flush(expectedValue);
        });
    });

    describe('getReferenceCreditCardTypes', () => {
        const values = [] as ValueLabel[];
        values.push({label: 'M', value: 'MasterCard'});
        values.push({label: 'V', value: 'Visa'});
        values.push({label: 'D', value: 'Discovery'});
        it('should convert DR to Draft from Idempiere Server', () => {
            spyOn(commonService, 'getLang').and.returnValue('en_US');
            commonService.getReferenceCreditCardTypes()
                .subscribe((result) => expect(result).toBe(values));

            const req = httpMock.expectOne(`${environment.apiUrl}/common/reference/creditcardtypes`);
            expect(req.request.method).toBe('GET');
            req.flush(values);
        });
    });
});
