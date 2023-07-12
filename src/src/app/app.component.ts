import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mode:any;

  constructor(private menu: MenuController) {}
  theme = "Mode nuit";
  selectedcurrency = "";

  openMenu() {
    this.menu.open('main-menu');
  }
}

