import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnimationController, Animation } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { HomePage } from './home/home.page';
import { ConfirmpasswordComponent } from './confirmpassword/confirmpassword.component';
import { RegisterComponent } from './register/register.component';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    IonIntlTelInputModule



  ],
  declarations: [LoginComponent,HomePage,ConfirmpasswordComponent,RegisterComponent]
})
export class AuthPageModule {


  
}
