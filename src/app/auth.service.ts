import { Injectable } from '@angular/core';
import {
  AuthService as SocialService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const API_URL = 'https://floating-ravine-25522.herokuapp.com/public/v1';

export { SocialUser } from 'angularx-social-login';


@Injectable()
export class AuthService {
  public user: SocialUser;
  private loggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private authService: SocialService
  ) {
    // this.loggedIn = new Subject<boolean>();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      // this.loggedIn.next(user != null);

      console.log('user', this.user);
      // console.log('loggedIn', this.loggedIn);
    });
  }

  get isLoggedIn(): Observable<boolean> {
    return Observable.of(true);
    // return this.loggedIn.asObservable();
  }

  signInWithEmail(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/login`, {});
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
