import { Component, Input } from '@angular/core';
import { AlertController, AlertInput, ModalController, PopoverController } from '@ionic/angular';
import { OrientationsService } from 'src/app/core/service/orientations.service';
import { ReportModalComponent } from './ReportPopoverComponent';
import { reportPopverComponent } from './reportPopver';

@Component({  
  selector: 'app-present-popover',
  template: ` 
    <ion-list>
      <ion-item (click)="showReportDialog()">
        <ion-icon slot="start" name="flag"></ion-icon>
        Signaler
      </ion-item>
      <ion-item (click)="showReportDialog2()">
        <ion-icon slot="start" name="flag"></ion-icon>
        Signaler et  bloquer
      </ion-item>
      <ion-item (click)="showInviteDialog()">
        <ion-icon slot="start" name="person-add"></ion-icon>
        Invite Parents
      </ion-item>

      <ion-item (click)="requestAccessToStudentProfile()">
        <ion-icon slot="start" name="person"></ion-icon>
         Accepter demande profil étudiant
      </ion-item>
      <ion-item (click)="TerminerOrientation()">
        <ion-icon slot="start" name="person"></ion-icon>
        Terminer l'orientation
      </ion-item>
    </ion-list>
  `
})
export class PresentPopoverComponent {
  @Input() id!: string;
  
  invitationPending: boolean = false;
terminerOrientation: boolean =false;
@Input() conseillerId!: string;
@Input() conseilleruserId!:string;
  constructor(private modalController: ModalController,private alertController: AlertController, private orientationsService: OrientationsService, private popoverController: PopoverController,) { }
  currentUser: any;
  async showReportConfirmationDialog() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Orientation terminé avec succès !',
      buttons: ['OK']
    });
    await alert.present();
  }

  async TerminerOrientation() {
    let terminer = false; // Variable de statut de l'invitation

    const alert = await this.alertController.create({
      header: 'Terminer  l orientation',
      message: 'Êtes-vous sûr de vouloir terminer cette orientation ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Terminer',
          handler: () => {
            if (terminer) {
              this.showSuccessMessage();

            } else {
              this.invitationPending = true;
              this.orientationsService.finirOrientation(this.id).subscribe(
                () => {
                  terminer = true;
                  this.dismissPopover();
                  this.showSuccessMessage();
                  window.location.reload(); // Refresh the page

                },
                (error) => {
                  this.terminerOrientation = false;
                  this.showInvitationAlreadySentMessage()
                }
              );
            }
          }
        }
      ]
    });
    await alert.present();
  }
  async showReportDialog() {
    console.log('hello');
  
    const modal = await this.modalController.create({
      component: ReportModalComponent,
      componentProps: {
        id: this.id, 
      } 
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.role === 'reported') {
        this.showReportConfirmationDialog();
      }
    });
  
    await modal.present();
  }
  async showReportDialog2() {
    console.log('hello');
  
    const modal = await this.modalController.create({
      component: reportPopverComponent,
      componentProps: {
        id: this.id, 
      } 
    });
  
    modal.onDidDismiss().then((data) => {
      if (data.role === 'reported') {
        this.showReportConfirmationDialog();
      }
    });
  
    await modal.present();
  }
  async showInviteDialog() {
    let invitationSent = false; // Variable de statut de l'invitation

    const alert = await this.alertController.create({
      header: 'Invite Parents',
      message: 'Voulez-vous inviter les parents à cette discussion ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
          
   this.showParentsPopup();
   this.showSuccessMessageparent();


          }
        }
      ]
    });

    await alert.present();
  }

  async showParentsPopup() {
    let invitationSent = false; // Variable de statut de l'invitation
  
    this.orientationsService.getEtudiantParents(this.id).subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          const parents = response;
  
          const inputs: AlertInput[] = parents.map(parent => ({
            type: 'radio',
            label: `${parent.nom} ${parent.prenom}`,
            value: parent.id.toString(),
            checked: false
          }));
  
          this.alertController.create({
            header: 'Liste des parents',
            inputs: inputs,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'OK',
                handler: (selectedParentId) => {
                  console.log('Selected parent:', selectedParentId);
                  const orientationId = this.id;

                  // Perform any further actions with the selected parent
                  this.orientationsService.inviteParent(orientationId, selectedParentId).subscribe(
                    () => {
                      
                      console.log('Parent invitation sent successfully');
                      // Mettez à jour le statut de l'invitation si nécessaire
                      // invitationSent = true;
                    },
                    (error) => {
                      console.log('Error sending parent invitation:', error);
                    }
                  );
              }}
            ]
          }).then(alert => alert.present());
        } else {
          console.log('Invalid response format: Expected an array of parents.');
        }
      },
      (error) => {
        console.log('Error retrieving parents:', error);
      }
    );
  }
  
  sendParentInvitation(parentId: string) {
    const orientationId = this.id;
    
    this.orientationsService.inviteParent(orientationId, parentId).subscribe(
      () => {
        
        console.log('Parent invitation sent successfully');
        // Mettez à jour le statut de l'invitation si nécessaire
        // invitationSent = true;
      },
      (error) => {
        console.log('Error sending parent invitation:', error);
      }
    );
  }
  
  
  
  
  async showInvitationSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Invitation envoyée',
      message: 'L\'invitation a été envoyée avec succès.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showSuccessMessagedemande() {
    const alert = await this.alertController.create({
      header: 'demande accepté',
      message: 'la demande a été accepté avec succès.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async showSuccessMessageparent() {
    const alert = await this.alertController.create({
      header: 'Parent invité',
      message: 'le parent à  été invité avec succès.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async showSuccessMessage() {
    const alert = await this.alertController.create({
      header: 'Orientation terminé',
      message: ' orientation terminé avec succès.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showInvitationAlreadySentMessage() {
    const alert = await this.alertController.create({
      header: 'Invitation déjà envoyée',
      message: 'L\'invitation a déjà été envoyée.',
      buttons: ['OK']
    });
    this.dismissPopover();
    await alert.present();
  }
  async dismissPopover() {
    await this.popoverController.dismiss();
  }



  async requestAccessToStudentProfile() {
    let invitationSent = false; // Variable de statut de l'invitation

    const alert = await this.alertController.create({
      
      header: 'Demande d\'accès',
      message: ' voulez-vous accpeter la demande  d accès au profil complet de l\'étudiant ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Accepter',
          handler: () => {
            if (invitationSent) {
              this.showInvitationAlreadySentMessage();
            } else {
              this.invitationPending = true;
              this.orientationsService.Accepterdemandeacces(this.id).subscribe(
                () => {
                  invitationSent = true;
                  this.dismissPopover();
                  this.showSuccessMessagedemande();
                },
                (error) => {
                  this.invitationPending = false;
                }
              );
            }
            // Effectuez la demande d'accès au profil de l'étudiant
          }
        }
      ]
    });
    await alert.present();
  }
}
