import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ConfirmpasswordComponent } from './confirmpassword/confirmpassword.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
 
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
 

  {
    path: 'confirm/:id',
    component: ConfirmpasswordComponent,
  },
  {
    path: '**',
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
