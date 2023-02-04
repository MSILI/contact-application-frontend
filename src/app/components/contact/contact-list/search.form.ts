import {FormControl} from "@angular/forms";

export interface SearchForm {
  query: FormControl<string | null>;
}
