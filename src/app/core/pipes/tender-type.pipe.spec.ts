import {TenderTypeFormatPipe} from './tender-type.pipe';
import {CommonService} from '../services/common.service';
import {TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('TenderTypeFormatPipe', () => {

    let commonService: CommonService;
    let pipe: TenderTypeFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CommonService, TranslateService],
            imports: [HttpClientTestingModule, TranslateModule.forRoot()]
        });
        commonService = TestBed.inject(CommonService);
        pipe = new TenderTypeFormatPipe(commonService);
    });

    it('should transform C to CreditCard', () => {
        const key = 'C';
        const value = 'CreditCard';
        spyOn(commonService, 'getReferenceTenderType').and.returnValue(of(value));
        expect(pipe.transform(key)).toEqual(value);
    });

});
