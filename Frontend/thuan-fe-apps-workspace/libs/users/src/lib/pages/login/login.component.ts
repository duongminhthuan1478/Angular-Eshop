import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@thuan-env/environment';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmit = false;
  isAuthenFailed = false;
  authMessage: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService
  ) { }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  login() {
    this.isSubmit = true;
    if(this.loginForm.invalid) return;

    const payload = {
      email: this.loginFormControls['email'].value,
      password: this.loginFormControls['password'].value
    }
    this._auth.login(payload.email, payload.password).subscribe({
      next: (res) => {
        if(res.success) {
          this.isAuthenFailed = false;
          localStorage.setItem(environment.LS.TOKEN, res.token);
          this.router.navigate(['/']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isAuthenFailed = true;
        // error not res from api
        if(err.status !== 400) { 
          this.authMessage = 'Error in the Server, please try it again later';
          return;
        }
        this.authMessage = err.error.message;
      }
    })
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


}
