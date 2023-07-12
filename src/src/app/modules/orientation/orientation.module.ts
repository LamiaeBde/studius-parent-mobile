import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationComponent } from './orientation.component';
import { orientationRoutingModule } from './orientation-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { IonicModule } from '@ionic/angular';
import { AjoutorientationComponent } from './ajoutorientation/ajoutorientation.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { PresentPopoverComponent } from './discussion/PresentPopoverComponent';
import { ReportModalComponent } from './discussion/ReportPopoverComponent';
import { OrientationdetailsComponent } from './orientationdetails/orientationdetails.component';
import { PresentPopComponent } from './PresentPopComponent';
import { PopComponent } from './PopComponent';
import { reportPopverComponent } from './discussion/reportPopver';



@NgModule({
  declarations: [OrientationComponent,AjoutorientationComponent,DiscussionComponent,PresentPopoverComponent,ReportModalComponent,OrientationdetailsComponent,PresentPopComponent,PopComponent,reportPopverComponent],
  imports: [
    CommonModule,
    orientationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonIntlTelInputModule,
    IonicModule,
    
  ]
})
export class OrientationModule { }
