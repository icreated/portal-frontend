import {TenderTypeFormatPipe} from './tender-type.pipe';
import {RegularService} from '@core/regular.service';
import {TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {of} from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TenderTypeFormatPipe', () => {

    let commonService: RegularService;
    let pipe: TenderTypeFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [RegularService, TranslateService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        commonService = TestBed.inject(RegularService);
        pipe = new TenderTypeFormatPipe(commonService);
    });

    it('should transform C to CreditCard', () => {
        const key = 'C';
        const value = 'CreditCard';
        spyOn(commonService, 'getReferenceTenderType').and.returnValue(of(value));
        expect(pipe.transform(key)).toEqual(value);
    });

});
