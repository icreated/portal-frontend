import {AbstractControl, FormGroup} from '@angular/forms';

export default class FormUtils {

    /**
     * Remove all values and errors from form
     *
     * @param form
     */
    static cleanForm(form: FormGroup) {
        if (form) {
            form.reset();
            Object.keys(form.controls).forEach(key => {
                const control = form.get(key);
                if (control) {
                    control.setErrors(null) ;
                }
            });
        }
    }

    /**
     * Get FormControl Name with parent FormGroup
     *
     * @param control
     */
    static getName(control: AbstractControl): string | null {
        if (!control) {
            return null;
        }
        const group = control.parent as FormGroup;
        if (!group) {
            return null;
        }
        let name = '';
        Object.keys(group.controls).forEach(key => {
            const childControl = group.get(key);
            if (childControl !== control) {
                return;
            }
            name = key;
        });
        return name;
    }
}

