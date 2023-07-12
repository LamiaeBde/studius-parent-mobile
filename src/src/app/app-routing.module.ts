import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminCompoenent } from './layouts/admin/admin.component';
import { authGuard, noAuthGuard } from './core/auth/guards/auth.guard';
;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/Auth/auth.module').then((m) => m.AuthPageModule)
  },
 
  {
    path: 'app',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: AdminCompoenent,
    loadChildren: () => import('../app/layouts/admin/admin.module').then(m => m.AdminModule),
    data: {
      title:'test home',
    },
  },
  {
    path: '**',
    redirectTo: 'app',
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
