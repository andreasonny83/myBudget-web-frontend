import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  public ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.registerForm = this.fb.group({
      username: ['', [ Validators.required, Validators.minLength(4) ] ],
      password: ['', [ Validators.required, Validators.minLength(4) ] ],
      passwordConfirm: ['', [ Validators.required, Validators.minLength(4) ] ],
      email: ['', [ Validators.required, Validators.email ] ],
    });
  }

  signInWithEmail(user: FormGroup): void {
    if (this.registerForm.invalid) {
      return;
    }

    const username = user.value.username;
    const password = user.value.password;

    this.registerForm.reset();

    this.authService.signInWithEmail(username, password)
      .subscribe(res => this.registerForm.reset());
  }
}
