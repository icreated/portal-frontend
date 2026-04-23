import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TranslateModule} from '@ngx-translate/core';
import {AuthenticationService} from '@core/services/authentication-service';
import {ToastService} from '@core/services/toast.service';
import {InputComponent} from '@shared/components/form/input/input.component';
import FormUtils from '@core/utils/FormUtils';
import {UsersService} from '@api/services/users.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, ButtonModule, PanelModule, TranslateModule, InputComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {

  private formBuilder = inject(UntypedFormBuilder);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private authenticationService = inject(AuthenticationService);
  private userService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);

  forgotForm: UntypedFormGroup = this.formBuilder.group({ email: ['', []] });
  loading = false;
  submitted = false;
  error = '';

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
