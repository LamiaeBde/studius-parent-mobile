import {    NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActualiteRoutingModule } from './actualite-routing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ActualiteComponent } from './actualite.component';
import { ActualitedetailsComponent } from './actualitedetails/actualitedetails.component';

@NgModule({

  declarations: [ActualiteComponent,ActualitedetailsComponent],

  imports: [
    NgxUsefulSwiperModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ActualiteRoutingModule,
    
    
  ]
})
export class ActualiteModule { }
