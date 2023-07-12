import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OrientationsService } from 'src/app/core/service/orientations.service';

@Component({
  selector: 'app-orientationdetails',
  templateUrl: './orientationdetails.component.html',
  styleUrls: ['./orientationdetails.component.scss'],
})
export class OrientationdetailsComponent  implements OnInit {

  constructor(private modalController:ModalController,private orientationsService:OrientationsService,     private navParams: NavParams    ) { }
  data: any;
  id!: any;
  selectedTab: any;

  ngOnInit() {
    
  this.id = this.navParams.get('id');
  console.log('ID:', this.id);
  this.orientationsService.getOrientationById(this.id).subscribe(


    {
      next: (e) => {
        this.data = e;
      }
    }
  );
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  
}

