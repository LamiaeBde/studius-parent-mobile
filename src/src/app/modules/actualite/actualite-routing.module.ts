import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteComponent } from './actualite.component';
import { ActualitedetailsComponent } from './actualitedetails/actualitedetails.component';
import { EmptyComponent } from 'src/app/layouts/empty/empty.component';
const routes: Routes = [
  {
    path: '',
    component: ActualiteComponent,
    data: {
      tabs:true,
    },
  },
  {

    path: 'details/:id',
    component: ActualitedetailsComponent,

    data: {
      tabs:false,
    },
  }
,
{
  path: '**',
  component: ActualiteComponent,
 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualiteRoutingModule {}
