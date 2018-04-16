import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthService, SocialUser } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public user: SocialUser;
  public loggedIn: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  public ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(6) ] ],
      password: ['', [ Validators.required, Validators.minLength(6) ] ],
    });
  }

  signInWithEmail(): void {
    this.authService.signInWithEmail('user', 'pass')
      .subscribe(res => {
        console.log(res);
      });
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  signInWithFB(): void {
    this.authService.signInWithFB();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
