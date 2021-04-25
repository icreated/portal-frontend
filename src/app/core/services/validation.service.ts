import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config : any = {
      'required': 'Mandatory',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Email is not valid',
      'invalidPassword': 'At least 6 characters',
      'minlength': `Min length ${validatorValue.requiredLength} characters`,
      'maxlength': `Max length${validatorValue.requiredLength} characters`,
      'invalidOldPassword': 'Old password is wrong',
      'notmatchPasswords': 'Password is not matching',
      'emailExists': 'Email exists in database',
      'emailNotExists': 'Email doesn\'t exit id database',
      'valueExists': 'Login already exists'
    };

    return config[validatorName];
  }

  static creditCardValidator(control:any) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control:any) {
    // RFC 2822 compliant regex
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static emptyValidator(control:any) {
    // RFC 2822 compliant regex
    if (control.value && control.value.trim().length > 0) {
      return null;
    } else {
      return { 'required': true };
    }
  }

  static passwordValidator(control:any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      //let passwordOriginal = group.controls[password];
      //if (passwordOriginal && passwordOriginal.value.)
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[confirmPasswordKey];
      if ((passwordInput && passwordConfirmationInput) && passwordInput.value !== passwordConfirmationInput.value) {
       return passwordConfirmationInput.setErrors({'notmatchPasswords': true});
      }
    };
  }






}
