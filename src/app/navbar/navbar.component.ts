import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public authService: AuthService) {
    console.log(this.authService.current_user);

    this.authService.loginWithEmailAndPassword('blitz@kiiro.com', '123456');
  }

  showMenu: boolean = false;
}
