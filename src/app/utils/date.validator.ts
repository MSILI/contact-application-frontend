import {AbstractControl} from "@angular/forms";
import * as moment from 'moment';

export class DateValidators {
  static validate(ac: AbstractControl) {
    if (ac && ac.value && !moment(ac.value, 'DD/MM/YYYY', true).isValid()) {
      return {date: true};
    }
    return null;
  }
}
