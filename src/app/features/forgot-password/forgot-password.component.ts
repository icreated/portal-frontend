import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';

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
  msgs: any[];

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private toastService: ToastService,
      private authenticationService: AuthenticationService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.forgotForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotForm.controls; }


  send() {

      this.toastService.clear();
      this.submitted = true;

      // stop here if form is invalid
      if (this.forgotForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.forgotPassword(this.f.email.value)
          .subscribe(
            () => {
                this.forgotForm.reset();
                this.toastService.addSingle('success', '', 'Email is sent.');
              },
              error => {
                  this.error = error;
                  this.loading = false;
                  this.forgotForm.reset();

                  if (error === 'Precondition failed') {
                    this.toastService.addSingle('warn', '', 'User doesn\'t exist');
                  } else {
                    this.toastService.addSingle('error', '', 'Email is not sent.');
                  }

              });
  }

}
