import {TenderTypeFormatPipe} from './tender-type.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {CommonService} from '@api/services/common.service';
import {of} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('TenderTypeFormatPipe', () => {

    let commonService: CommonService;
    let pipe: TenderTypeFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [CommonService, TenderTypeFormatPipe, TranslateService,
                provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
        commonService = TestBed.inject(CommonService);
        pipe = TestBed.inject(TenderTypeFormatPipe);
    });

    it('should transform C to CreditCard', () => {
        const key = 'C';
        spyOn(commonService, 'getTenderType').and.returnValue(of({label: 'CreditCard', value: 'C'}));
        expect(pipe.transform(key)).toEqual('CreditCard');
    });

});
