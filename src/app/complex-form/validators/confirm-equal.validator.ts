import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        // Verify that the 2 inputs name exist in the form
        // If the two inputs doesn't exist, return Invalid control names
        if (!ctrl.get(main) || !ctrl.get(confirm)) {
            return {
                confirmEqual: 'Invalid control names'
            };
        }
        // Return the values
        const mainValue = ctrl.get(main)!.value;
        const confirmValue = ctrl.get(confirm)!.value;
        // Check if the values are the same
        return mainValue === confirmValue ? null : {
            confirmEqual: {
                main: mainValue,
                confirm: confirmValue
            }
        };
    };
}
