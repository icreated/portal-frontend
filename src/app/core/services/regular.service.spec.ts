import {TestBed} from '@angular/core/testing';
import {RegularService} from './regular.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {ValueLabel} from "../../api/models/value-label";

describe('RegulrService', () => {
    let commonService: RegularService;
    let translateService: TranslateService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TranslateService],
            imports: [HttpClientTestingModule, TranslateModule.forRoot()]
        });
        commonService = TestBed.inject(RegularService);
        translateService = TestBed.inject(TranslateService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getLang', () => {
        it('should convert en to en_US', () => {
            spyOnProperty(translateService, 'currentLang').and.returnValue('en');
            expect(commonService.getLang()).toEqual('en_US');
        });
    });
});
