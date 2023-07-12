import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  user: any = {};
  imgsrc!: any;
  show_tab: boolean = true;
  show_header: boolean = true;

  constructor(private service: AuthService, private alertController: AlertController,private router :Router) { }

  ngOnInit(): void {
    this.imgsrc = localStorage.getItem('profileImge');
    console.log(this.show_tab);

    this.service.getProfileCurrentUser().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        this.presentAlert(error.message);
      }
    );

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url.includes('details')) {
            this.show_tab = false;
            this.show_header = false;
          } else {
            this.show_tab = true;
            this.show_header = true;
          }
        }
      }
    );
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


 
  ShowDetails(username: any) {

    //     this.service.getProfile().subscribe((response) => {




    //   });
  }


  async desconnexion() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Se déconnecter du compte ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Déconnexion',
          handler: () => {
            this.service.logout();
          }
        }
      ],
      mode: 'ios',
      cssClass: 'my-ios-alert'
    });
  
    await alert.present();
  }
  

  


}

