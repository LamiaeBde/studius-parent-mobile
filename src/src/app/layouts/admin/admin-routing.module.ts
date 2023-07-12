import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCompoenent } from './admin.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'actualite',
    loadChildren: () => import('../../modules/actualite/actualite.module').then(m => m.ActualiteModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'etablissement',
    loadChildren: () => import('../../modules/etablissement/etablissement.module').then(m => m.EtabissementModule)
  },
  {
    path: 'orientation',
    loadChildren: () => import('../../modules/orientation/orientation.module').then(m => m.OrientationModule)
  },
 
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
