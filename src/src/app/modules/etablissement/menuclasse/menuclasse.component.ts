import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-menuclasse',
  templateUrl: './menuclasse.component.html',
  styleUrls: ['./menuclasse.component.scss'],
})
export class MenuclasseComponent  implements OnInit {
  id!: any;
  idEtudiant!:any;

  constructor(private modalController: ModalController,private router:Router,private navCtrl: NavController,     private navParams: NavParams,
    ) { }

  ngOnInit() {this.id = this.navParams.get('id');
  this.idEtudiant = this.navParams.get('idEtudiant');
  console.log('ID:', this.id);
  console.log('IDEtudiant:', this.idEtudiant);

}
  dismissModal() {
    this.modalController.dismiss();
  }
  orientation(){
    this.modalController.dismiss(); // Fermer le modèle
  
    this.router.navigateByUrl('/app/orientation', { state: { id: this.id, idEtudiant: this.idEtudiant } });
    console.log(this.id)
    console.log(this.idEtudiant)

  }
}
