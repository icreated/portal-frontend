import {TestBed} from '@angular/core/testing';

import {ValidationService} from './validation.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

describe('ValidationService', () => {
    let formBuilder: FormBuilder;
    let form: AbstractControl;

    const INPUT_WITH_NUMBER = 'inputWithNumber';
    const INPUT_WITH_CAPITAL = 'inputWithCapital';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormBuilder]
        });
        formBuilder = TestBed.inject(FormBuilder);
        form = formBuilder.group({
            inputWithNumber : ['', [ValidationService.patternValidator(/\d/, {hasNumber: true})]],
            inputWithCapital : ['', [ValidationService.patternValidator(/[A-Z]/, {hasCapitalCase: true})]],
            newPassword : [],
            confirmPassword: []
        },
        {validators: [ValidationService.passwordMatchValidator]}
        );
    });

    describe('patternValidator', () => {

        it('should bypass if value is null', () => {
            const value = null;
            const control = form.get(INPUT_WITH_NUMBER);
            if (control) {
                control.setValue(value);
                expect(control.valid).toBeTruthy();
            }

        });

        it('should be falsy when no number', () => {
            const value = 'Hello';
            const control = form.get(INPUT_WITH_NUMBER);
            if (control) {
                control.setValue(value);
                expect(control.valid).toBeFalsy();
            }
        });

        it('should be truthy when with number', () => {
            const value = 'Hello5';
            const control = form.get(INPUT_WITH_NUMBER);
            if (control) {
                control.setValue(value);
                expect(control.valid).toBeTruthy();
            }
        });

        it('should be falsy when with no capital', () => {
            const value = 'hello5';
            const control = form.get(INPUT_WITH_CAPITAL);
            if (control) {
                control.setValue(value);
                expect(control.valid).toBeFalsy();
            }
        });

        it('should be truthy when with capital', () => {
            const value = 'heLlo5';
            const control = form.get(INPUT_WITH_CAPITAL);
            if (control) {
                control.setValue(value);
                expect(control.valid).toBeTruthy();
            }
        });
    });


    describe('passwordMatchValidator', () => {

        it('should be truthy when newPassword & confirmPassword are matching', () => {
            const newPasswordValue = 'Hello';

            const newPassword = form.get('newPassword');
            const confirmPassword = form.get('confirmPassword');
            if (newPassword && confirmPassword) {
                newPassword.setValue(newPasswordValue);
                confirmPassword.setValue(newPasswordValue);

                expect(form.hasError('noPassswordMatch')).toBeFalsy();
            }
        });

        it('should be falsy when newPassword & confirmPassword are NOT matching', () => {
            const newPasswordValue = 'Hello';
            const confirmPasswordNotMatching = 'hello';
            const newPassword = form.get('newPassword');
            const confirmPassword = form.get('confirmPassword');
            if (newPassword && confirmPassword) {
                newPassword.setValue(confirmPasswordNotMatching);
                confirmPassword.setValue(newPasswordValue);

                expect(form.hasError('noPassswordMatch')).toBeTruthy();
            }
        });

    });

});
