import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  required,
  email,
  minLength,
  onlyAlphabet,
  matchTwoPasswordFields,
} from '../../shared/forms/validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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

  submit(event: Event) {
    event.preventDefault();
  }
}
