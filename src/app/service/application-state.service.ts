import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  public isMobile: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isCollapsed = new Subject<boolean>();

  constructor(private breakpointObserver: BreakpointObserver) { 
    this.onResize();
  }

  onResize() {
    this.breakpointObserver
      .observe(['(max-width: 650px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.isMobile.next(true);
        } else {
          this.isMobile.next(false);
        }
      })
  }
}
