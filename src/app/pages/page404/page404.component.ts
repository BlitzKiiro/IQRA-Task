import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css',
})
export class Page404Component {}
