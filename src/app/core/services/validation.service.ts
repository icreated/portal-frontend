import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // if control is empty return no error
                return null as any;
            }

            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);

            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null as any : error;
        };
    }


    static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {

        const password: string = control.get('newPassword')?.value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword')?.value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirmPassword')?.setErrors({noPassswordMatch: true});
            return ({noPassswordMatch: true});
        }
        return null;


    }

}
