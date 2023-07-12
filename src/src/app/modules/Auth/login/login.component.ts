import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this._fb.group({
    username: [, Validators.required],
    password: [, Validators.required]
  })
  constructor(private _loginService: AuthService, private _fb: FormBuilder, public alertController: AlertController, private toastController: ToastController


  ) { }
  ngOnInit() { }
  login() {

    this._loginService.login(this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value);



  }



  resetPassword(email: any) {
    console.log(email);
    this._loginService.ResetPassword(email).subscribe(response => {

      console.log("succes");


    })



  }


  async presentAlert() {

    const alert = await this.alertController.create({

      header: 'Réinitialiser mon mot de passe',

      mode: 'ios',

      cssClass: 'my-alert',

      inputs: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'E-mail'
        }
      ],

      message: `
    
     <div class="message">
    
      <p>Veuillez saisir l'adresse mail de votre compte ci-dessous. Nous vous enverrons un mail pour réinitialiser votre mot de passe à cette adresse.</p>
    

            
          </div>
            
`,

      buttons: [

        {

          text: 'Annuler',

          role: 'cancel',

          cssClass: 'secondary',

          handler: () => {

            console.log('Cancel clicked');

          }

        },
        {

          text: 'Ok',
          handler: (data) => {
            if (data !== null) {
              const email = data.email;
              this.resetPassword(email);
            }
            else { console.log("email not found") }
          }

        }

      ]

    });

    alert.onDidDismiss();
    await alert.present();

  }
}
