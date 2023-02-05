import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {CsvService} from "../../../services/csv.service";
import {FileValidator} from "../../../utils/file.validator";

@Component({
  selector: 'app-contact-upload-dialog',
  templateUrl: './contact-upload-dialog.component.html',
  styleUrls: ['./contact-upload-dialog.component.scss']
})
export class ContactUploadDialogComponent implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  public uploadForm: FormGroup;
  public file: any;
  public allowedFileExtensions = ['csv'];

  constructor(private fb: FormBuilder,
              private csvService: CsvService,
              private dialogRef: MatDialogRef<ContactUploadDialogComponent>) {
    this.uploadForm = this.initForm();
  }

  public onSelectFile(event: any) {
    this.file = event.target.files[0];
    console.log(event.target.files);
  }

  private initForm() {
    return this.fb.group({
      file: [null, [Validators.required, FileValidator.fileUploadValidator(this.allowedFileExtensions)]]
    });
  }

  onSubmit() {
    if (this.uploadForm.invalid) {
      this.uploadForm.get('file')?.markAsTouched({onlySelf: true});
    } else {
      const formData: FormData = new FormData();
      formData.append('file', this.file);
      this.csvService.upload(formData)
        .pipe(
          takeUntil(this.unsubscribe$),
          tap(() => this.dialogRef.close({status: 'uploaded'}))
        ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
