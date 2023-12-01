import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { RootComponent } from './layout/root/root.component';
import { authenticatedRoute, unauthenticatedRoute } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
        canActivate: [unauthenticatedRoute],
      },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [unauthenticatedRoute],
      },
    ],
  },
  { path: '**', component: Page404Component },
];
