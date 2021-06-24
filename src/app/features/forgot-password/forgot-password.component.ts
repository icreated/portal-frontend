import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';
import {Message} from 'primeng/api';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  msgs: Message[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router,
              private toastService: ToastService, private authenticationService: AuthenticationService) {

      this.forgotForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      });
  }

  ngOnInit() {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  // convenience getter for easy access to form fields
  get f() {
      return this.forgotForm.controls;
  }


  send() {

      this.toastService.clear();
      this.submitted = true;

      // stop here if form is invalid
      if (this.forgotForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.forgotPassword(this.f.email.value).subscribe(
          () => {
              this.toastService.addSingle('success', '', 'email-sent', true);
              this.f.email.setErrors(null);
              this.router.navigate(['/']);
          },
          error => {
              this.error = error;
              this.loading = false;
              this.forgotForm.reset();

              if (error === 'Precondition failed') {
                  this.toastService.addSingle('warn', '', 'user-not-exists', true);
              } else {
                  this.toastService.addSingle('error', '', 'email-not-sent', true);
              }
          });
  }

}
