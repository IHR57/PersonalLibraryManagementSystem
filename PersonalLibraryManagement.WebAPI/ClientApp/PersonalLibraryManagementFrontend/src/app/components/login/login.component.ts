import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoginButtonDisabled = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.isLoginButtonDisabled = true;
    this.authService
      .login(
        this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value
      )
      .subscribe({
        next: (response: any) => {
          this.openSnackBar(
            'User Logged In Successfully',
            'Success!',
            'snackbar-success'
          );
          this.storageService.saveUser(response);
          this.isLoginButtonDisabled = false;
          window.location.reload();
        },
        error: (error: any) => {
          this.openSnackBar('Error Occured', 'Failed!', 'snackbar-failed');
          this.isLoginButtonDisabled = false;
        },
        complete: () => {
          this.isLoginButtonDisabled = false;
        },
      });
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: [panelClass],
    });
  }
}
