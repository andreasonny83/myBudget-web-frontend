import { Component } from '@angular/core';
import { AuthService, SocialUser } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myBudget';
  loggedIn: any;

  constructor(private authService: AuthService) {
    this.loggedIn = authService.isLoggedIn;
  }

  logOut(): void {
    this.authService.signOut();
  }
}
