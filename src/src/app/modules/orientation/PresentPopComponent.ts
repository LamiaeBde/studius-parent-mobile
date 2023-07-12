import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertInput, ModalController, PopoverController } from '@ionic/angular';
import { OrientationsService } from 'src/app/core/service/orientations.service';
import { OrientationdetailsComponent } from './orientationdetails/orientationdetails.component';
import { DiscussionComponent } from './discussion/discussion.component';

@Component({
  selector: 'app-present-popover',
  template: ` 
    <ion-list>
  
     
      <ion-item  (click)="orientationdetails()" style="--border-style:none">
      <ion-icon name="information-circle-outline" style="    color: #3d81aa;"></ion-icon>    <p style="margin-left: 10px;"> Details d'orientation</p>   
      </ion-item>

          
      <ion-item  (click)="Chat()" style="--border-style:none">
      <ion-icon name="chatbubble-ellipses-outline" style="    color: #3d81aa;"></ion-icon>     <p style="margin-left: 10px;">Chat</p>   
      </ion-item>
    </ion-list>
  `
})
export class PresentPopComponent {
  @Input() id!: string;

  invitationPending: boolean = false;
  terminerOrientation: boolean = false;
  @Input() conseillerId!: string;
  @Input() conseilleruserId!: string;
  constructor(private modalController: ModalController, private alertController: AlertController, private orientationsService: OrientationsService, private popoverController: PopoverController,private router:Router) { }
  currentUser: any;


  async orientationdetails() {
    console.log('ID:', this.id);

    const modal = await this.modalController.create({
      component: OrientationdetailsComponent,
      componentProps: {
        id: this.id
              }
               });   
    return await modal.present();  }
   
 
    async Chat() {
      console.log(this.id)
      console.log(this.conseillerId)

      const modal = await this.modalController.create({
        
        component: DiscussionComponent,
        componentProps: {
          id: this.id,
          conseillerId: this.conseillerId
  
        }
      });
      return await modal.present();  }

}

