import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService as SocialService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angularx-social-login';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const API_URL = 'https://floating-ravine-25522.herokuapp.com/public/v1';

export { SocialUser } from 'angularx-social-login';

export interface User {
  alias: string;
  firstname: string;
  lastname: string;
  socialType: number;
  username: string;
}

export interface Accounts {
  id: string;
  name: string;
  numberOfUsers: number;
  status: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  accounts: Array<Accounts>;
}

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

  signInWithEmail(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/login`, { username, password });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res: SocialUser) => {
        console.log(res);
      });
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
