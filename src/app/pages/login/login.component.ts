import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { required, email, minLength } from '../../../shared/forms/validators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoading: boolean = false;
  errorMsg: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [required, email]),
    password: new FormControl('', [required]),
  });

  touchedAndError(fieldName: string) {
    return (
      this.loginForm.get(fieldName)?.invalid &&
      (this.loginForm.get(fieldName)?.touched ||
        this.loginForm.get(fieldName)?.dirty)
    );
  }

  async submit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    try {
      await this.authService.loginWithEmailAndPassword(
        this.loginForm.get('email')!.value!,
        this.loginForm.get('password')!.value!
      );
      this.router.navigate(['/']);
    } catch (error: any) {
      console.log(error);
      this.errorMsg = error.message;
    }
    this.isLoading = false;
  }
}
