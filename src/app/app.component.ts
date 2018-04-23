import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService, SocialUser } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { MatIconRegistry } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myBudget';
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
  ) {
    this.matIconRegistry.addSvgIcon(
      `facebook_icon`,
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/fb.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      `google_icon`,
      domSanitizer.bypassSecurityTrustResourceUrl('../assets/google.svg'),
    );
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logOut(): void {
    this.authService.signOut();
  }
}
