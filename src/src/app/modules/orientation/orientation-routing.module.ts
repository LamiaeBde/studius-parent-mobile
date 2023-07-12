import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrientationComponent } from './orientation.component';
import { AjoutorientationComponent } from './ajoutorientation/ajoutorientation.component';
import { OrientationdetailsComponent } from './orientationdetails/orientationdetails.component';
const routes: Routes = [
  {
    path: '',
    component: OrientationComponent,
   
  },
  
  {
    path: 'ajouter',
    component: AjoutorientationComponent,
    data: {
        tabs:false,
      },
  },
 
  {
    path: 'details',
    component: OrientationdetailsComponent,
    data: {
        tabs:false,
      },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class orientationRoutingModule {}
