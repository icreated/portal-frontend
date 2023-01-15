import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';
import {Message} from 'primeng/api';
import FormUtils from '../../core/utils/FormUtils';
import {UsersService} from '../../api/services/users.service';
import {handleAutoChangeDetectionStatus} from '@angular/cdk/testing';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  error = '';
  msgs: Message[] = [];

  constructor(private formBuilder: UntypedFormBuilder, private router: Router,
              private toastService: ToastService, private authenticationService: AuthenticationService,
              private userService: UsersService) {

      this.forgotForm = this.formBuilder.group({
          email: ['', []],
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
      this.userService.sendEmailToken({body: { value: this.f.email.value}}).subscribe(
        () => {
          this.toastService.addSingle('success', '', 'email-sent', true);
          FormUtils.cleanForm(this.forgotForm);
          this.loading = false;
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.loading = false;
          this.forgotForm.reset();

          this.toastService.handleCommonErrorMessages(error);
        });

  }

}
