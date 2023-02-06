import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, Subject, takeUntil, tap} from "rxjs";
import {AccountService} from "./services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  public username?: string;

  constructor(private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public accountService: AccountService) {
  }

  private updatePageTitle() {
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          const title = 'title';
          if (child?.snapshot.data[title]) {
            return child.snapshot.data[title];
          }
          return appTitle;
        })
      )
      .subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }

  ngOnInit(): void {
    this.updatePageTitle();
    this.accountService.authenticatedObs$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(authenticated => {
          if (authenticated) {
            this.username = this.accountService.getCurrentUser()?.username;
          }
        })
      ).subscribe()
    this.username = this.accountService.getCurrentUser()?.username;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.accountService.logout();
    this.username = undefined;
    this.router.navigate(['/account/login']).then();
  }
}
