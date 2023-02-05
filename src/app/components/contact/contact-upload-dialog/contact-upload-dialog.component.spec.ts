import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUploadDialogComponent } from './contact-upload-dialog.component';

describe('ContactUploadDialogComponent', () => {
  let component: ContactUploadDialogComponent;
  let fixture: ComponentFixture<ContactUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUploadDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
