import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContactService} from "../../../services/contact.service";
import {Contact} from "../../../model/contact.model";

@Component({
  selector: 'app-contact-delete-dialog',
  templateUrl: './contact-delete-dialog.component.html',
  styleUrls: ['./contact-delete-dialog.component.scss']
})
export class ContactDeleteDialogComponent implements OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();


  constructor(private dialogRef: MatDialogRef<ContactDeleteDialogComponent>,
              private contactService: ContactService,
              @Inject(MAT_DIALOG_DATA) public data: Contact) {
  }

  public onSubmit(): void {
    this.contactService
      .deleteById(this.data.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.dialogRef.close({ status: 'removed', data: this.data });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
