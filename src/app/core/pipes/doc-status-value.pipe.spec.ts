import {DocStatusFormatPipe} from './doc-status-value.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {CommonService} from '@api/services/common.service';
import {of} from 'rxjs';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('DocStatusFormatPipe', () => {

    let commonService: CommonService;
    let pipe: DocStatusFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [CommonService, DocStatusFormatPipe, TranslateService,
                provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        });
        commonService = TestBed.inject(CommonService);
        pipe = TestBed.inject(DocStatusFormatPipe);
    });

    it('should transform CO to Completed', (done) => {
        const key = 'CO';
        spyOn(commonService, 'getDocStatus').and.returnValue(of({label: 'Completed', value: 'CO'}));
        pipe.transform(key).subscribe(result => {
            expect(result).toEqual('Completed');
            done();
        });
    });

});
