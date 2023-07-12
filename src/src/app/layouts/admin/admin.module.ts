import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { IonicModule } from '@ionic/angular';
import { AdminCompoenent } from './admin.component';
import { EmptyComponent } from '../empty/empty.component';
import { MenuComponent } from '../menu/menu.component';



@NgModule({
  declarations: [AdminCompoenent, EmptyComponent,MenuComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    IonicModule.forRoot()
  ]
})
export class AdminModule { }
