import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import LoginReq from 'src/app/models/request/login-request';
import RegisterReq from 'src/app/models/request/register-req';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string | undefined;
  password: string | undefined;

  isPassVisible: boolean = false;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  isLogin: boolean = true;
  public registerReq = new RegisterReq('', '', '');
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private overLay: OverlayService,
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('bhuvancom', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9_]{3,20}$/),
      ]),
      password: new FormControl('password', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this.registerForm = new FormGroup({
      username: new FormControl('bhuvancom', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9_]{3,20}$/),
      ]),
      password: new FormControl('password', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('abc@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
    });

    this.loginForm.controls['username'].valueChanges.subscribe((e) => {
      this.username = e;
    });

    this.registerForm.controls['username'].valueChanges.subscribe((e) => {
      this.registerReq.userName = e;
    });
    this.registerForm.controls['email'].valueChanges.subscribe((e) => {
      this.registerReq.email = e;
    });
    this.registerForm.controls['password'].valueChanges.subscribe((e) => {
      this.registerReq.password = e;
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.username = this.loginForm.controls['username'].value ?? '';
      this.password = this.loginForm.controls['password'].value ?? '';
      const loginReq = new LoginReq(this.username!, this.password!);
      this.overLay.setIsLoading(true);
      this.authService.login(loginReq).subscribe({
        next: (response) => {
          this.overLay.setIsLoading(false);
          this._router.navigate(['/']);
        },
        error: (error) => {
          this.overLay.setIsLoading(false);
          this.showSnackBar(error.error.message);
        },
        complete: () => {
          this.overLay.setIsLoading(false);
        },
      });
    } else {
      this.showSnackBar('Please enter username/password');
    }
  }

  showSnackBar(msg: string): void {
    this.snackbar.open(msg, undefined, {
      duration: 2 * 1000,
    });
  }
  clearName() {
    this.loginForm.controls['username'].setValue('');
  }
  register() {
    if (this.registerForm.valid) {
      this.overLay.setIsLoading(true);
      this.authService.register(this.registerReq).subscribe({
        next: (response) => {
          this.showSnackBar(
            'Please check our email for verification and login.'
          );
          this.formToggle();
        },
        error: (error) => {
          this.showSnackBar(error);
        },
        complete: () => {
          this.overLay.setIsLoading(false);
        },
      });
    } else {
      this.showSnackBar('Plase check registration form');
    }
  }
  formToggle() {
    this.isLogin = !this.isLogin;
  }
}
