import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService as SocialService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const API_URL = 'https://floating-ravine-25522.herokuapp.com/public/v1';

export { SocialUser } from 'angularx-social-login';

@Injectable()
export class AuthService {
  public user: SocialUser;
  private loggedIn: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialService
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn.next(user !== null);

      if (user !== null) {
        this.router.navigate(['/']);
      }
    });
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signInWithEmail(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/login`, { username, password });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService
      .signOut()
      .then(() => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      });
  }
}
