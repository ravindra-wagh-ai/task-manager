import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityService } from '../security.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [SecurityService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  matcher = new MyErrorStateMatcher();
  title = 'Sign In';
  constructor(
    private snackBar: MatSnackBar,
    private _router: Router,
    private security: SecurityService,
    private store: StoreService,
  ) {}
  async ngOnInit(): Promise<void> {
    let token = this.security.token();
    console.log("token:", token);
    if (token !== null) {
      let authenticated = await this.security.isAuthenticated();
      if (authenticated) {
        this._router.navigate(['/home']);
      } else {
        this._router.navigate(['/signin']);
      }
    } else {
      this._router.navigate(['/signin']);
    }
  }

  async signin() {
    let email = this.emailFormControl.value;
    let password = this.passwordFormControl.value;
    let result: any = await this.security.check(email, password);
    let token = result.data?.signin?.token;
    if (token !== undefined) {
      this.store.saveData('xt', token);
      this._router.navigate(['/home']);
    } else {
      if (result?.errors?.length > 0) {
        let error = result?.errors?.shift();
        let extensions = error?.extensions;
        let message = extensions?.originalError?.message;
        this.snackBar.open(message, undefined, {
          panelClass: ['snackbar-error'],
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    }
  }
}
