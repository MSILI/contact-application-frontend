import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {LoaderService} from "./loader.service";
import {LoaderState} from "./loader.state";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show = false;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.loaderService.loaderState
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
