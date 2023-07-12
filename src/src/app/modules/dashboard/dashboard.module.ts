import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
