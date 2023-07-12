import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { etablissementRoutingModule } from './etablissement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EtablissementComponent } from './etablissement.component';
import { ClasseComponent } from './classe/classe.component';
import { MenuclasseComponent } from './menuclasse/menuclasse.component';



@NgModule({
  declarations: [EtablissementComponent,ClasseComponent,MenuclasseComponent],
  imports: [
    CommonModule,
    etablissementRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  providers: [
    Location, // Ajoutez Location comme fournisseur
    // Autres fournisseurs...
  ],
})
export class EtabissementModule { }
