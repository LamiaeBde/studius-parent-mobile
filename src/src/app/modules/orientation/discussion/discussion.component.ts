import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavParams, PopoverController } from '@ionic/angular';
import { Message } from 'src/app/core/models/Message';
import { MessageDto } from 'src/app/core/models/MessageDto';
import { Orientations } from 'src/app/core/models/Orientations';
import { OrientationsService } from 'src/app/core/service/orientations.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PresentPopoverComponent } from './PresentPopoverComponent';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent implements OnInit {
  messagesList: Message[] = [];
  messageText: string = '';
  showOptions = false;
  orientation!: Orientations;
  id!: any;
  data: any;
  messageToSend: string = '';
  userId!: string;
  currentUser: any; currentDate: Date = new Date();
  conseillerId!:string; 

  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private orientationsService: OrientationsService,
    private navParams: NavParams, private autServcie: AuthService
  ) { }

  ngOnInit() {
    
    this.id = this.navParams.get('id');
    this.conseillerId = this.navParams.get('conseillerId');


    console.log('ID:', this.id);
    this.orientationsService.getOrientationById(this.id).subscribe({
      next: (e) => {
        this.data = e; this.checkOrientationStatus();
        this.getMessagesByOrientation();  
        const ConseilleruserID=e.conseiller?.userID; 
        console.log('conseillerseId.',ConseilleruserID);
      }
    });
  }
  status: any; 

  checkOrientationStatus() {
    const orientationId = this.data?.id;
    this.orientationsService.checkOrientationStatus(orientationId).subscribe(
      status => {
        this.status = status; 
       
      },
      error => {
      
      }
    );
  }
  

  async presentPopover(event: any, id: string,conseillerId :string ,conseilleruserId:string){
    
    const popover = await this.popoverController.create({
      component: PresentPopoverComponent,
      componentProps: {
        id: id ,
        conseillerId :conseillerId ,
        conseilleruserId:this.conseillerId
      },
      event: event,
      translucent: true
    });
  
    popover.onDidDismiss().then((data) => {
      this.checkOrientationStatus();
    });
  
    return await popover.present();
  }
  

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
  sendMessage() {
    this.autServcie.getProfileCurrentUser().subscribe(
      currentUser => {
        const userId = currentUser.id;
        const messageDto: MessageDto = {
          textMessage: this.messageText,
          userId: userId
        };
        console.log(userId);
        const orientationId = this.data?.id;

        this.orientationsService.postMessage(orientationId, messageDto).subscribe(
          response => {
            this.getMessagesByOrientation();
            this.messageText = '';
          },
          error => {

          }
        );
      },
      error => {

      }
    );
  }



  getMessagesByOrientation() {
    const orientationId = this.data?.id;
    this.orientationsService.getMessagesByOrientation(orientationId).subscribe(
      response => {
        this.messagesList = response;
       this.displayMessages();
      },

    );
  }
  isYesterday(date: string): boolean {
    const messageDate = new Date(date);
    const today = new Date();

    return messageDate.getDate() === today.getDate() - 1 && messageDate.getMonth() === today.getMonth() && messageDate.getFullYear() === today.getFullYear();
  }

  displayMessages() {
    this.autServcie.getProfileCurrentUser().subscribe(
      currentUser => {
        this.currentUser = currentUser;


        const filteredMessages = this.messagesList.filter(message => {

          const messageDate = new Date(message.createdDateTime);
          const currentDate = new Date();


          return messageDate <= currentDate;
        });

        filteredMessages.forEach(message => {
          if (message.userId === this.currentUser.id) {
            console.log('Message à droite:', message.textMessage);

          } else if (message.userId === message.orientation.conseiller.userID) {
            console.log('Message à gauche-conseiller:', message.textMessage);

          } else { console.log('Message à gauche-parent  :', message.textMessage); }
        });
      },

    );
  }




  dismissModal() {
    this.modalController.dismiss();
  }


}