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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  public ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(4) ] ],
      password: ['', [ Validators.required, Validators.minLength(4) ] ],
    });
  }

  signInWithEmail(user: FormGroup): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = user.value.username;
    const password = user.value.password;

    this.authService.signInWithEmail(username, password)
      .subscribe(res => this.loginForm.reset());
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
