import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Auth, authState } from '@angular/fire/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from '../../services/auth.service';
import { Administrators } from '../../models/Administrator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;
  modalService = inject(NgbModal);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  onSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      let email = this.loginForm.controls['email'].value;
      let password = this.loginForm.controls['password'].value;
      this.checkAdmin(email, password);
    } else {
      this.toastr.error('Invalid Form');
    }
  }

  checkAdmin(email: string, password: string) {
    this.authService
      .getAdminInfo(email)
      .then((data) => {
        if (data !== null) {
          this.login(data, password);
        } else {
          this.isLoading = false;
          this.toastr.error('Admin not found!');
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.toastr.error(err['message']);
      });
  }
  forgot() {
    const modal = this.modalService.open(ForgotPasswordComponent);
    modal.result
      .then((data: string | null) => {
        if (data) {
          this.forgotPassword(data);
        } else {
          this.toastr.error('Invalid email');
        }
      })
      .catch((err) => this.toastr.error('Error '));
  }

  login(administrator: Administrators, password: string) {
    this.authService
      .login(administrator.email, password)
      .then((task) => {
        this.toastr.success('Successfully Logged in');
        this.authService.setAdmin(administrator);
      })
      .catch((err: FirebaseError) => {
        this.toastr.success(err['message']);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  forgotPassword(email: string) {
    this.authService
      .forgotPassword(email)
      .then((data) => {
        this.toastr.success(
          `We sent password reset confirmation to ${email}`,
          'Password Reset'
        );
      })
      .catch((err) => {
        this.toastr.error(err['message'].toString());
      });
  }
}
