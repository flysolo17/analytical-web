import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.controls['email'].value;
      let password = this.loginForm.controls['password'].value;
      this.authService
        .login(email, password)
        .then((task) => {
          alert('Successfully Logged in');
          this.router.navigate(['main']);
        })
        .catch((err: FirebaseError) => {
          console.log(err);
          if (err.code == 'auth/user-not-found') {
            alert('user not found');
            return;
          }
          alert(err['message']);
        });
    } else {
      alert('User not found!');
    }
  }
  forgot() {}
}
