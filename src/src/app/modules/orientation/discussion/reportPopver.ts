import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TypeSignal, UserSignalDto } from 'src/app/core/models/UserSignalDto';
import { EtudiantService } from 'src/app/core/service/etudiant.service';
import { OrientationsService } from 'src/app/core/service/orientations.service';

@Component({
  selector: 'app-report-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Signaler une orientation</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cancel()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form (ngSubmit)="submitForm()">
        <ion-item>
          <ion-label>Raison</ion-label>
          <ion-input [(ngModel)]="Raison" name="Raison" type="text"></ion-input>
        </ion-item>
       
      
        <div class="ion-padding">
          <ion-button expand="block" type="submit" color="primary">Signaler</ion-button>
        </div>
      </form>
    </ion-content>
  `,
  styles: [`
    ion-header {
      ion-toolbar {
        --ion-color-primary: #3880ff;
        --ion-color-light: #fff;
      }

      ion-title {
        color: #fff;
      }
    }

    ion-content {
      ion-item {
        --ion-color-primary: #3880ff;
      }

      form {
        ion-button {
          --ion-background-color: #3880ff;
          --ion-color: #fff;
        }
      }

      .ion-padding {
        padding: 16px;
      }
    }
  `],
})
export class reportPopverComponent {
  @Input() conseilleruserId!: string; @Input () id !:string
  Raison: string = '';

  constructor(private modalController: ModalController, private etudiantservice: EtudiantService) {}

  cancel() {
    this.modalController.dismiss();
  }

  submitForm() {
    const orientationId = this.id; // Assurez-vous que this.id contient la valeur appropriée de l'orientation
    const Raison = this.Raison; // Assurez-vous que this.raison contient la valeur appropriée de la raison
    const bloque = true; // Remplacez par la valeur appropriée de bloque
    console.log(this.Raison)
    this.etudiantservice.signalConseiller(orientationId, Raison, bloque).subscribe(
      () => {
        this.modalController.dismiss({
          role: 'reported',
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}