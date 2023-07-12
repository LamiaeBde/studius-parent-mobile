import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasseService } from 'src/app/core/service/classe.service';
import { EtudiantService } from 'src/app/core/service/etudiant.service';
import { ClasseComponent } from './classe/classe.component';
import { ModalController } from '@ionic/angular';
import { MenuComponent } from 'src/app/layouts/menu/menu.component';
import { MenuclasseComponent } from './menuclasse/menuclasse.component';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss'],
})
export class EtablissementComponent implements OnInit {
  idEtudiant: any;
  constructor(private etudiantservice: EtudiantService, private classeservice: ClasseService, private router: Router, private modalController: ModalController,
    private changeDetectorRef: ChangeDetectorRef) {   
    }
    etudiants: string[] = [];


    pageTitle = 'Classes';

    cards: any[] = [];

    selectedSegment: string = 'true';

  public tableau!: any[];
  cardColor!: string;

  ngOnInit() {
    this.getClasse();
    this.etudiantservice.getEtudiantsCurrentUser().subscribe(
      (response: any[]) => {
        this.etudiants = response.map(etudiant => etudiant.nomEtudiant);
      },
      (error) => {
        console.log('Erreur lors de la récupération des étudiants :', error);
      }
    );
    
  } 
 
  
 
  
  colors: string[] = ['linear-gradient(to left, #5c258d, #4389a2)', 'linear-gradient(to left, #134e5e, #71b280)', 'linear-gradient(to left, #2bc0e4, #eaecc6)'];

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
  getetudiantbyid(id: any) {
    this.classeservice.getIdEtudiant(id).subscribe(
      (response) => {
        // Appeler la méthode showmenu en passant l'id de la classe et l'idEtudiant
        this.showmenu(id, response);
        console.log(response)
      },
      (error) => {
        // Gérez les erreurs de la requête ici
        console.error(error);
      }
    );
  }
  
  async showmenu(id: any, idEtudiant: any) {
    try {
      const response = await this.classeservice.getIdEtudiant(id).toPromise();
      console.log(response);
  
      const modal = await this.modalController.create({
        component: MenuclasseComponent,
        componentProps: {
          id: id,
          idEtudiant: response[0].toString()
        }
      });
  
      console.log(idEtudiant);
      await modal.present();
    } catch (error) {
      console.error(error);
    }
  }
  
  
  
  archiverClasse(classeId: string): void {
    console.log("click")
    this.classeservice.archiverClasse(classeId)
      .subscribe(
        () => {
          this.getClasse();

          // Traitement après l'archivage réussi
        },
        (error) => {
          // Gestion de l'erreur en cas d'échec de l'archivage
        }
      );
  }
  getClasse(): void {
    this.classeservice.getClasseByIdEtudiant().subscribe(data => {
      this.tableau = data;
      const classeId = data.classeId; 

    });
  }

  deleteClasse(id: any) {
    this.etudiantservice.deleteClasse(id).subscribe(
      () => {
        this.getClasse();
        console.log('La classe a été supprimée avec succès.');
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la suppression de la classe :', error);
      }
    );
  }

  async openModal1() {
    const modal = await this.modalController.create({
      component: ClasseComponent,

    });


    modal.onDidDismiss().then(() => {
      this.getClasse();
    });
    
    return await modal.present();
  }

 
  private generateRandomColors() {
    const colorCount = 10; // Number of cards and colors
    for (let i = 0; i < colorCount; i++) {
      const color = this.getRandomColor();
      this.cards.push({ color });
    }
  }

    // Le reste du code de votre composant
  }
  
