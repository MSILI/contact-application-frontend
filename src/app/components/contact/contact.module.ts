import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactRoutingModule} from './contact-routing.module';
import {ContactListComponent} from './contact-list/contact-list.component';
import {ContactFormComponent} from './contact-form/contact-form.component';
import {ContactDeleteDialogComponent} from './contact-delete-dialog/contact-delete-dialog.component';
import {ContactDetailsComponent} from './contact-details/contact-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import { ContactUploadDialogComponent } from './contact-upload-dialog/contact-upload-dialog.component';

@NgModule({
  declarations: [
    ContactListComponent,
    ContactFormComponent,
    ContactDeleteDialogComponent,
    ContactDetailsComponent,
    ContactUploadDialogComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR',
    }
  ]
})
export class ContactModule {
}
