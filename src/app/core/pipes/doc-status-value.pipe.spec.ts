import {DocStatusFormatPipe} from './doc-status-value.pipe';
import {TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CommonService} from '../services/common.service';
import {of} from 'rxjs';

describe('DocStatusFormatPipe', () => {

    let commonService: CommonService;
    let pipe: DocStatusFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CommonService, TranslateService],
            imports: [HttpClientTestingModule, TranslateModule.forRoot()]
        });
        commonService = TestBed.inject(CommonService);
        pipe = new DocStatusFormatPipe(commonService);
    });

    it('should transform CO to Completed', () => {
        const key = 'CO';
        const value = 'Completed';
        spyOn(commonService, 'getReferenceDocStatus').and.returnValue(of(value));
        expect(pipe.transform(key)).toEqual(value);
    });

});
