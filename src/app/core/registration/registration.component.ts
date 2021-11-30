import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { STATUS } from "../../models";
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private noteService: NotificationService,
    private router: Router,
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm: ['', Validators.required]
    }, { validators: this.confirmPassValidator
    })
  }

  confirmPassValidator(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password');
    const confirmPass = control.get('confirm');

    return pass?.value != confirmPass?.value ? { confirm: true } : null;

  }

  hasFieldErrors(name: string): boolean {
    return this.registrationForm.controls[name].invalid && this.registrationForm.controls[name].touched;
  }

  ngOnInit(): void {
  }

  get passLength (): number {
    return this.registrationForm.get('password')?.value.length;
  }

  submitRegistrationForm (e: Event) {
    if (this.registrationForm.status === STATUS.VALID) {
      this.authService.signUp(this.registrationForm.value).subscribe(
        (data: any) => {
          const token = data.id_token;
          localStorage.setItem('auth_token', token);
          this.noteService.show('You have successfully registered');

          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 700)
        }, (error) => {
        this.noteService.showError(error.error);
      })
    } else {
      this.noteService.showError('Username, Email, Password are required')
    }
  }

}
