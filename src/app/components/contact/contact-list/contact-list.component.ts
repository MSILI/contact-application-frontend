import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil, tap} from "rxjs";
import {Contact} from "../../../model/contact.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SearchForm} from "./search.form";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ContactFormComponent} from "../contact-form/contact-form.component";
import {ContactDeleteDialogComponent} from "../contact-delete-dialog/contact-delete-dialog.component";
import {ContactUploadDialogComponent} from "../contact-upload-dialog/contact-upload-dialog.component";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy, AfterViewInit {

  private unsubscribe$: Subject<void> = new Subject<void>();
  public contacts: (Contact | undefined)[] = [];
  public displayedColumns: string[] = ['id', 'firstname', 'lastname', 'actions'];
  public searchForm: FormGroup<SearchForm>;

  constructor(private contactService: ContactService,
              private fb: FormBuilder,
              private liveAnnouncer: LiveAnnouncer,
              public dialog: MatDialog) {
    this.searchForm = this.fb.group({
      query: ['', []]
    });
  }

  ngOnInit(): void {
    this.findAll();
    this.onQueryChange();
  }

  private onQueryChange() {
    this.searchForm.get('query')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(value => {
          if (value === '') {
            this.findAll();
          }
        })
      ).subscribe();
  }

  private findAll(query?: string | null): void {
    this.contactService
      .findAllByFirstnameOrLastname(query)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((contacts: Contact[]) => {
          this.contacts = contacts;
        })
      ).subscribe();
  }

  openContactForm(contact?: Contact): void {
    if (!contact) {
      contact = new Contact;
    }
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: contact,
      width: '800px',
    });
    this.afterDialogClosed(dialogRef);
  }

  private afterDialogClosed(dialogRef: MatDialogRef<ContactFormComponent, any>) {
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(result => {
          switch (result.status) {
            case 'saved':
              this.contacts = [...this.contacts, result.data]
              break;
            case 'updated':
              this.contacts = this.contacts.map(item =>
                result.data.id === item?.id ? result.data : item
              );
              break;
            default:
              break;
          }
        })
      ).subscribe()
  }

  openBrandDeleteDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactDeleteDialogComponent, {
      data: contact,
      width: '800px',
    });
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((result) => {
          if (result.status === 'removed') {
            this.contacts = this.contacts.filter(
              item => result.data.id !== item?.id
            );
          }
        })
      ).subscribe()
  }

  openUploadForm() {
    const dialogRef = this.dialog.open(ContactUploadDialogComponent, {
      width: '800px',
    });
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((result) => {
          if (result.status === 'uploaded') {
            this.findAll();
          }
        })
      ).subscribe()
  }

  onKeyboardEnter() {
    this.findAll(this.searchForm.get('query')?.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit(): void {

  }
}
