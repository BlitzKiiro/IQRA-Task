import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  required,
  email,
  minLength,
  onlyAlphabet,
  matchTwoPasswordFields,
} from '../../../shared/forms/validators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { FirestoreService } from '../../../shared/services/firestore.service';
import { Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  isLoading: boolean = false;
  errorMsg: string = '';

  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [required, onlyAlphabet, minLength(3)]),
      lastName: new FormControl('', [required, onlyAlphabet, minLength(3)]),
      email: new FormControl('', [required, email]),
      password: new FormControl('', [required, minLength(6)]),
      confirmPassword: new FormControl('', [required]),
    },
    { validators: matchTwoPasswordFields('password', 'confirmPassword') }
  );

  touchedAndError(fieldName: string) {
    console.log(fieldName, this.registerForm.get(fieldName)?.errors);

    console.log('ALL FORM ERRORS', this.registerForm.errors);

    return (
      this.registerForm.get(fieldName)?.invalid &&
      (this.registerForm.get(fieldName)?.touched ||
        this.registerForm.get(fieldName)?.dirty)
    );
  }

  async submit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    try {
      const { user } = await this.authService.registerWithEmailAndPassword(
        this.registerForm.get('email')!.value!,
        this.registerForm.get('password')!.value!,
        this.registerForm.get('firstName')!.value!,
        this.registerForm.get('lastName')!.value!
      );
      if (user) {
        await this.firestoreService.addUserRecord({
          user_id: user.uid,
          email: user.email!,
          first_name: this.registerForm.get('firstName')!.value!,
          last_name: this.registerForm.get('lastName')!.value!,
        });
      }

      this.router.navigate(['/']);
    } catch (error: any) {
      console.log(error);
      this.errorMsg = error.message;
    }
    this.isLoading = false;
  }
}
