import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TranslateModule} from '@ngx-translate/core';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {ToastService} from 'src/app/core/services/toast.service';
import {InputComponent} from 'src/app/shared/components/form/input/input.component';
import {PasswordComponent} from 'src/app/shared/components/form/password/password.component';
import FormUtils from '../../core/utils/FormUtils';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, ButtonModule, PanelModule, TranslateModule, InputComponent, PasswordComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  private formBuilder = inject(UntypedFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private routeStateService = inject(RouteStateService);
  private authenticationService = inject(AuthenticationService);
  private cdr = inject(ChangeDetectorRef);

  loginForm: UntypedFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      password: ['', [Validators.required]]
  });
  loading = false;
  submitted = false;
  returnUrl = '/';

  ngOnInit() {
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
      return this.loginForm.controls;
  }

  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }
      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              () => {
                  this.routeStateService.add('Dashboard', '/main/dashboard', null, true);
              },
              error => {
                  this.toastService.clear();
                  FormUtils.cleanForm(this.loginForm);
                  this.loading = false;
                  this.cdr.markForCheck();
                  this.toastService.addSingle('error', '', 'login-invalid-user', true);
              });
  }
}
