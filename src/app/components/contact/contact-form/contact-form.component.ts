import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactService} from "../../../services/contact.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../../model/contact.model";
import {Subject, takeUntil, tap} from "rxjs";
import {DateValidators} from "../../../utils/date.validator";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  public contactForm: FormGroup;
  public mailExistsErrorMessage: string = '';
  public phoneExistsErrorMessage: string = '';

  constructor(private dialogRef: MatDialogRef<ContactFormComponent>,
              private contactService: ContactService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Contact) {
    this.contactForm = this.initForm();
  }

  private initForm() {
    return this.fb.group({
      id: [null, []],
      firstname: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastname: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      birthDay: [null, [Validators.required, DateValidators.validate]],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^(0033|\+33|0)(6|7)[0-9]{8}$/)]]
    });
  }

  ngOnInit(): void {
    this.patchValues();
  }

  private patchValues() {
    this.contactForm.patchValue({
      id: this.data.id,
      firstname: this.data.firstname,
      lastname: this.data.lastname,
      birthDay: this.data.birthDay ? new Date(this.data.birthDay) : null,
      address: this.data.address,
      phone: this.data.phone,
      email: this.data.email
    })
  }

  public onSubmit() {
    if (this.contactForm.invalid) {
      this.validateAllFormFields()
    } else {
      const contract: Contact = this.contactForm.value;
      if (contract && !contract.id) {
        this.saveContact(contract);
      } else {
        this.updateContact(contract);
      }
    }
  }

  private updateContact(contract: Contact) {
    this.contactService.update(contract)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(response => this.dialogRef.close({status: 'updated', data: response}))
      ).subscribe();
  }

  private saveContact(contract: Contact) {
    this.contactService.save(contract)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response: Contact) => {
          this.dialogRef.close({status: 'saved', data: response});
        },
        error: (err: any) => {
          if (err.status === 400) {
            if (err.error.message.includes(this.contactForm.get('email')?.value)) {
              this.mailExistsErrorMessage = err.error.message;
              this.contactForm.get('email')?.setErrors({emailExists: true});
            }
            if (err.error.message.includes(this.contactForm.get('phone')?.value)) {
              this.phoneExistsErrorMessage = err.error.message;
              this.contactForm.get('phone')?.setErrors({phoneExists: true});
            }
          }
        }
      });
  }

  private validateAllFormFields() {
    Object.keys(this.contactForm.controls).forEach((field) => {
      const control = this.contactForm.get(field);
      control?.markAsTouched({onlySelf: true});
    });
  }

  public hasError(controlName: string, errorType: string) {
    return this.contactForm.get(controlName)?.hasError(errorType);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
