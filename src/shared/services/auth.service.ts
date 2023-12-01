import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  current_user: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.current_user = JSON.parse(localStorage.getItem('user') || 'null');

    this.afAuth.authState.subscribe((user) => {
      this.current_user = user;
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    const credentials = await this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    return credentials;
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.current_user = null;
  }

  async registerWithEmailAndPassword(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) {
    const credentials = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = credentials.user;
    if (user && firstName && lastName) {
      await user.updateProfile({
        displayName: firstName + ' ' + lastName,
      });
    }
    return credentials;
  }
}
