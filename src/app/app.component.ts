import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { AuthService, LanguageService } from '@core';
import { MatSidenav } from '@shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string;
  public isLoggedIn$: Observable<boolean>;
  public isHandset: Observable<BreakpointState>;

  @ViewChild('drawer')
  public drawer: MatSidenav;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.title = 'myBudget';
    this.isHandset = this.breakpointObserver.observe(Breakpoints.Handset);
    this.languageService.init();
  }

  public ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  public logOut(): void {
    this.authService.signOut();
    this.drawer.close();
  }
}
