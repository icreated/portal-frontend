import {DocStatusFormatPipe} from './doc-status-value.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {RegularService} from '@core/regular.service';
import {of} from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DocStatusFormatPipe', () => {

    let commonService: RegularService;
    let pipe: DocStatusFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [RegularService, TranslateService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        commonService = TestBed.inject(RegularService);
        pipe = new DocStatusFormatPipe(commonService);
    });

    it('should transform CO to Completed', () => {
        const key = 'CO';
        const value = 'Completed';
        spyOn(commonService, 'getReferenceDocStatus').and.returnValue(of(value));
        expect(pipe.transform(key)).toEqual(value);
    });

});
