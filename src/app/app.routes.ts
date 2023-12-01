import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { RootComponent } from './root/root.component';
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
