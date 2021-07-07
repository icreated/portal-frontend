import {NgModule} from '@angular/core';
import {DocStatusFormatPipe} from './doc-status-value.pipe';
import {TenderTypeFormatPipe} from './tender-type.pipe';

@NgModule({
    imports: [],
    declarations: [DocStatusFormatPipe, TenderTypeFormatPipe],
    exports: [DocStatusFormatPipe, TenderTypeFormatPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
