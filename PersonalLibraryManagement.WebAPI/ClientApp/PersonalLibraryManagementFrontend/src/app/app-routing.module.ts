import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyLibraryComponent } from './components/my-library/my-library.component';
import { BookDetailsComponent } from './components/my-library/book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'my-library',
    component: MyLibraryComponent,
  },
  {
    path: 'my-library/book/:id',
    component: BookDetailsComponent
  },
  { path: '', redirectTo: '/my-library', pathMatch: 'full' },
  { path: '**', redirectTo: '/my-library' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
