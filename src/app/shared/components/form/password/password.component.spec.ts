import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PasswordComponent} from './password.component';
import {TranslateModule} from '@ngx-translate/core';

describe('PasswordComponent', () => {
    let component: PasswordComponent;
    let fixture: ComponentFixture<PasswordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PasswordComponent, TranslateModule.forRoot()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
