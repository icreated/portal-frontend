import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import {AppCommonModule} from '../../../../app.common.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormControl, FormControlName} from '@angular/forms';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ InputComponent ],
            imports: [AppCommonModule, TranslateModule.forRoot()],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
