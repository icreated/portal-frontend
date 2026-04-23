import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {ToastService} from 'src/app/core/services/toast.service';
import FormUtils from '../../core/utils/FormUtils';
import {UsersService} from '../../api/services/users.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: UntypedFormBuilder, private router: Router,
              private toastService: ToastService, private authenticationService: AuthenticationService,
              private userService: UsersService, private cdr: ChangeDetectorRef) {

      this.forgotForm = this.formBuilder.group({
          email: ['', []],
      });
  }

  ngOnInit() {
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  get f() {
      return this.forgotForm.controls;
  }

  send() {
      this.toastService.clear();
      this.submitted = true;

      if (this.forgotForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.sendEmailToken({body: { value: this.f.email.value}}).subscribe(
        () => {
          this.toastService.addSingle('success', '', 'email-sent', true);
          FormUtils.cleanForm(this.forgotForm);
          this.loading = false;
          this.cdr.markForCheck();
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.loading = false;
          this.forgotForm.reset();
          this.cdr.markForCheck();
          this.toastService.handleCommonErrorMessages(error);
        });

  }

}
