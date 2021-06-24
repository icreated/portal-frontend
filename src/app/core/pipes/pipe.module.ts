import {NgModule} from '@angular/core';
import {DocStatusFormat} from './doc-status-value';
import {TenderTypeFormat} from './tender-type';

@NgModule({
    imports: [],
    declarations: [DocStatusFormat, TenderTypeFormat],
    exports: [DocStatusFormat, TenderTypeFormat],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
