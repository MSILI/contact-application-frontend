import {Component, OnDestroy, OnInit} from '@angular/core';
import {mergeMap, Subject, takeUntil, tap} from "rxjs";
import {Contact} from "../../../model/contact.model";
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../../../services/contact.service";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  public contact: Contact = new Contact();

  constructor(private route: ActivatedRoute,
              private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        mergeMap(params => this.contactService.findById(params['id'])),
        tap((contact: Contact) => this.contact = contact)
      ).subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
