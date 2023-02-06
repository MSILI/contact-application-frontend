import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";
import {User} from "../../../model/user.model";
import {TokenObject} from "../../../model/token-object.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();
  loginForm: FormGroup;
  errorMessage: string = '';
  hidePassword = true;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router) {
    this.loginForm = this.initForm();
  }

  private initForm() {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false, []],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public hasError(controlName: string, errorType: string): boolean | undefined {
    return this.loginForm.get(controlName)?.hasError(errorType);
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({onlySelf: true});
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.validateAllFormFields(this.loginForm);
    } else {
      const user: User = this.loginForm.value;
      const rememberMe = this.loginForm.get('rememberMe')?.value;
      this.accountService
        .login(user)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (response: TokenObject) => {
            if (rememberMe) {
              localStorage.setItem('tokenObject', JSON.stringify(response));
            } else {
              sessionStorage.setItem('tokenObject', JSON.stringify(response));
            }
            this.accountService.authenticatedSubject$.next(true);
            this.router.navigate(['/']).then();
          },
          error: (err) => {
            if (err.error.message.includes('Bad credentials')) {
              this.errorMessage = 'Email ou mot de passe incorrecte';
            } else {
              this.errorMessage = 'Une erreur est survenue au niveau du serveur';
            }
          }
        });
    }
  }


}
