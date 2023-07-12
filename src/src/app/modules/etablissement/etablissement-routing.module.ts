import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtabissementModule } from './etablissement.module';
import { EtablissementComponent } from './etablissement.component';
import { ClasseComponent } from './classe/classe.component';
import { MenuComponent } from 'src/app/layouts/menu/menu.component';
import { MenuclasseComponent } from './menuclasse/menuclasse.component';
const routes: Routes = [

  {


    path: '',
    component: EtablissementComponent,
  },
  {
    path: 'ajouter',
    component: ClasseComponent,
    data: {
      tabs: false,
    }
  },
  {
    path: 'menu',
    component: MenuclasseComponent,
    data: {
      tabs: false,
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class etablissementRoutingModule { }
