import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from "../../services/auth.service";
import { NotificationService } from './../../services/notification.service';

import { STATUS } from "../../models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isShowError = false;
  public errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private noteService: NotificationService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4)]]
    })
  }

  hasFieldErrors(name: string): boolean {
    return this.loginForm.controls[name].invalid && this.loginForm.controls[name].touched;
  }

  ngOnInit(): void {
  }

  submitLoginForm (e: Event) {
    if (this.loginForm.status === STATUS.VALID) {
      this.authService.logIn(this.loginForm.value)
        .subscribe((data: any) => {
          const token = data.id_token;
          localStorage.setItem('auth_token', token);
          this.router.navigateByUrl('/');

        },(error) => {
          this.noteService.showError(error.error)
        });
    } else {
      this.noteService.showError('Email and Password are required');
    }
  }
}
