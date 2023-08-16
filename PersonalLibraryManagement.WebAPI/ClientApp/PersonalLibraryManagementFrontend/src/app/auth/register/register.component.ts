import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  isButtonDisabled: boolean = false;

  registerForm: FormGroup = new FormGroup({
    displayName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),  
    email: new FormControl('', [Validators.required, Validators.email])
  }, [CustomValidators.MatchValidator('password', 'confirmPassword')]);
 
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  registerUser() {
    this.isButtonDisabled = true;
    this.authService.registerNewUser(this.registerForm.value)
    .subscribe({
      next: (response: any) => {
        console.log(response);
        this.openSnackBar("User Registered Successfully", "Success!", "snackbar-success")
        this.isButtonDisabled = false;
      },
      error: (error: any) => {
        this.openSnackBar("Error Occured", "Failed!", "snackbar-failed")
        this.isButtonDisabled = false;
      },
      complete: () => { 
        this.isButtonDisabled = false;
      }
    })
  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2000,
      panelClass: [ panelClass ]
    });
  }
}


export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
