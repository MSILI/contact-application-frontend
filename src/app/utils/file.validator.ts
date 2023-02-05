import {AbstractControl, ValidatorFn} from "@angular/forms";

export class FileValidator {
  static fileUploadValidator(allowedExtensions: any): ValidatorFn {
    console.log('inside validation');
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && isNaN(control.value)) {
        const file = control.value;
        const ext = file.substring(file.lastIndexOf('.') + 1);
        if (!allowedExtensions.includes(ext.toLowerCase())) {
          return {extensionFile: true };
        }
      }
      return null;
    };
  }
}
