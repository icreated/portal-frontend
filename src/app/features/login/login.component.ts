import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from 'src/app/core/services/authentication-service';
import {RouteStateService} from 'src/app/core/services/route-state.service';
import {ToastService} from 'src/app/core/services/toast.service';
import {Message} from 'primeng/api';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '/';
  msgs: Message[] = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private toastService: ToastService, private routeStateService: RouteStateService,
              private authenticationService: AuthenticationService) {

      this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]]
      });

  }

  ngOnInit() {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
      return this.loginForm.controls;
  }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
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
                  this.loginForm.reset();
                  this.loading = false;
                  this.toastService.addSingle('error', '', 'login-invalid-user', true);
              });
  }
}
