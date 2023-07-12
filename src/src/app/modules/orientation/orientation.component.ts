import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AnimationController, AlertController, PopoverController, IonTabs } from '@ionic/angular';
import { Orientations } from 'src/app/core/models/Orientations';
import { OrientationsService } from 'src/app/core/service/orientations.service';
import { AjoutorientationComponent } from './ajoutorientation/ajoutorientation.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { OrientationdetailsComponent } from './orientationdetails/orientationdetails.component';
import { PresentPopoverComponent } from './discussion/PresentPopoverComponent';
import { PresentPopComponent } from './PresentPopComponent';
import { PopComponent } from './PopComponent';
import { IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular';
import { SharedService } from 'src/app/core/service/shared.service';
import { ClasseService } from 'src/app/core/service/classe.service';

type NewType = any;

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements OnInit {
  @ViewChild('tabs', {static: false}) tabs!: IonTabs;

  public orientations: Orientations[] = [];
  public filteredOrientations: any[] = [];
  public selectedDate: string = '';
  public searchTerm: string = '';
  matchingOrientationFound = false;
  tableau!: any[]; 

  selectedSegment: string = 'EnCours';
  orientation!: any;
  data: any[] = [];
  lenght: any;
  id:any;
  idEtudiant:any;
  constructor(
    private orientationsService: OrientationsService,
    private router: Router,
    private modalController: ModalController,
    private animationCtrl: AnimationController,
    private alertController: AlertController,
    private popoverController:PopoverController,
    public sharedService: SharedService ,private classeService: ClasseService ) { }



    async openModal1() {
      const modal = await this.modalController.create({
        component: AjoutorientationComponent,
        componentProps: {
          id: this.id,
  idEtudiant:this.idEtudiant
        }
      });
    
      modal.onDidDismiss().then(() => {
        this.getOrientationByEtudiant(this.idEtudiant);
      });
    
      return await modal.present();
    }
    
  selectedTab: any;

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab);
  }

  ngOnInit() {
    console.log(this.orientation)
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.id = state ? state['id'] : null;
    this.idEtudiant = state ? state['idEtudiant'] : null;

    this.getOrientationByEtudiant(this.idEtudiant);
    
    
    console.log(this.id) 
    console.log(this.idEtudiant)
    this.getClasse();
  }

  hasMatchingOrientation(orientations: any[]): boolean {
    for (const orientation of orientations) {
      if (orientation.statut === 3 || orientation.statut === 6 || orientation.statut === 7 || orientation.statut === 2) {
        this.matchingOrientationFound = true;
        return true; 
      }
    }
    return false;
  }
isNoFilteredOrientations(): boolean {
  return this.selectedSegment === 'EnCours' &&
   !this.filteredOrientations?.some(o => [3, 6, 7, 2].includes(o?.statut));
}







  getStatutIcon(statut: number) {
    switch (statut) {
      case 2:
        return 'Envoyé';
      case 3:
        return 'EnCours';
      case 4:
        return 'Terminé';
      case 5:
        return 'Annulé';
      case 6:
        return 'AccessProfile';
      case 7:
        return 'EnAttendant';
      default:
        return '';
    }
  }


  filterOrientations() {
    if (this.searchTerm.trim() !== '') {
      this.filteredOrientations = this.orientations.filter(

        (orientation) =>
          orientation.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      console.log(this.filteredOrientations)
      this.filteredOrientations = this.orientations;

    }
  }




  getOrientationByEtudiant(idEtudiant:NewType): void {
    this.orientationsService.getOrientationByIdEtudiant(idEtudiant).subscribe((orientations) => {
      this.orientations = orientations;
      this.filteredOrientations = orientations;
      if (orientations && orientations.length > 0) {
        const id = orientations[0].id;
        console.log(id);
      }
    });
  }



  getClasse(): void {
    this.classeService.getClasseByIdEtudiant().subscribe(data => {
      this.tableau = data; 
    });
  }
  getDescriptionSnippet(description: string): string {
    if (description && description.length > 0) {
      const charactersPerLine = 20; // Specify the number of characters per line
      const totalCharacters = 40; // Specify the total number of characters to display
      let result = '';
  
      for (let i = 0; i < totalCharacters; i += charactersPerLine) {
        const line = description.substr(i, charactersPerLine);
        result += line ;
      }
  
      result += '...'; // Add ellipsis at the end
  
      return result;
    }
  
    return description;
  }
   getDescriptionSnippet2(description: string) {
    if (description && description.length > 0) {
      const charactersPerLine = 100; // Spécifie le nombre de caractères par ligne
      const totalCharacters = 300; // Spécifie le nombre total de caractères à afficher
      let result = '';
  
      for (let i = 0; i < totalCharacters; i += charactersPerLine) {
        const line = description.substr(i, charactersPerLine);
        result += line + '<br>';
      }
  
      result += '...'; // Ajoute des points de suspension à la fin
  
      return result;
    }
  
    return description;
  }
  
  
  
  
  async presentPopover(id:any,conseillerId: string){
    console.log("click");

    const popover = await this.popoverController.create({
      
      component: PresentPopComponent,
      componentProps: {
        id: id ,
        conseillerId: conseillerId


      },
      
      event: event,
      translucent: true
    });
  
    return await popover.present();
    
  }

  async presentPop(id:any){
    console.log("click");

    const popover = await this.popoverController.create({
      
      component: PopComponent,
      componentProps: {
        id: id ,


      },
      
      event: event,
      translucent: true
    });
  
    return await popover.present();
    
  }
  
  async ShowDetails(id: any) {
    const modal = await this.modalController.create({
      component: OrientationdetailsComponent,
      componentProps: {
        id: id
              }
               });   console.log(id)
    return await modal.present();
  }
  
  async openModal(id: any) {
    const modal = await this.modalController.create({
      component: AjoutorientationComponent,
      componentProps: { id },
      enterAnimation: (baseEl: HTMLElement) => {
        const root = baseEl.shadowRoot;
        if (!root) {
          throw new Error('Shadow root not found');
        }

        const backdropAnimation = this.animationCtrl
          .create()
          .addElement(root.querySelector('ion-backdrop')!)
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

        const wrapperAnimation = this.animationCtrl
          .create()
          .addElement(root.querySelector('.modal-wrapper')!)
          .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(0)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' },
          ]);

        return this.animationCtrl
          .create()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
      },
      leaveAnimation: (baseEl: HTMLElement) => {
        return this.animationCtrl.create()
          .addElement(baseEl)
          .duration(500)
          .fromTo('opacity', '1', '0');
      }
    });

    return await modal.present();
  }
  async Chat(id: any, conseillerId: string) {
    const modal = await this.modalController.create({
      component: DiscussionComponent,
      componentProps: {
        id: id,
        conseillerId: conseillerId

      }
    });
    modal.onDidDismiss().then(() => {
      this.getOrientationByEtudiant(this.idEtudiant);
    });
    return await modal.present();
    // }
  }
}
