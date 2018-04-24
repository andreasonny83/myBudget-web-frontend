import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SocialUser, LoginResponse } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitting: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  public ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(4) ] ],
      password: ['', [ Validators.required, Validators.minLength(4) ] ],
    });
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }

  signInWithEmail(user: FormGroup): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = user.value.username;
    const password = user.value.password;

    this.submitting = true;
    this.loginForm.get('username').disable();
    this.loginForm.get('password').disable();

    this.authService.signInWithEmail(username, password)
      .subscribe(
        res => {
          console.log(res);
          this.loginForm.reset();
          this.submitting = false;
          this.loginForm.get('username').enable();
          this.loginForm.get('password').enable();
        },
        err => {
          this.submitting = false;
          this.loginForm.get('username').enable();
          this.loginForm.get('password').enable();
        }
      );
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
