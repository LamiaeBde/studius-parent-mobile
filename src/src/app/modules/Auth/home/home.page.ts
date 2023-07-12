import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { animation, trigger, animate, style } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 
})

export class HomePage {
  constructor(private animation: AnimationController) {}
  showAnimation = false;

  triggerAnimation() {
    this.showAnimation = true;
  }
  toogleTheme(event: any){
    if(event.detail.checked){
    document.body.setAttribute('color-theme','dark')
    }
    else{
      document.body.setAttribute('color-theme','light')

    }
   }
   
}
