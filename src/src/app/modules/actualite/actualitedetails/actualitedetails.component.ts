import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Actualite } from 'src/app/core/models/actualite';
import { ActualiteService } from 'src/app/core/service/actualite.service';
import { AdminCompoenent } from 'src/app/layouts/admin/admin.component';
import { SwiperOptions } from 'swiper';
import { Location  } from '@angular/common';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { SharedService } from 'src/app/core/service/shared.service';
@Component({
  selector: 'app-actualitedetails',
  templateUrl: './actualitedetails.component.html',
  styleUrls: ['./actualitedetails.component.scss'],
})
export class ActualitedetailsComponent implements OnInit ,OnDestroy{
  postlist!: any;
  @Input() isLiked!: any;

  id!: any;
  data: any = {};
  testlike: boolean = true;
  countLikes!:number;
  ionRouterOutlet: any;
  constructor(

    private actualiteser: ActualiteService,
    private router: Router,
    private _location: Location,
     public navCtrl: NavController,
     private route: ActivatedRoute,
     private sharedService: SharedService,
     private navParams: NavParams,
     private modalController:ModalController

  ) { 
    route.url.subscribe(() => {
      console.log(route?.snapshot?.data);
     });
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  likeButtonClick(id: any): void {
    const likeactualite = {
      ActualiteId: id,
    };
  
    console.log(likeactualite);
        this.actualiteser.like(likeactualite).subscribe(response => {
          this.data.countLikes = !this.data.countLikes;
          console.log('isLiked:', this.data.countLikes);


      if (this.testlike) {


        this.testlike = false;


      }
      else {
        this.testlike = true;

      }

    

    })

  }
  
  ngOnInit(): void {
    this.id = this.navParams.get('id');
    console.log('ID:', this.id);
    this.actualiteser.getActualiteById(this.id).subscribe((e: any) => {
      this.data = e;
      this.countLikes = e.countLikes; // Mettez à jour countLikes avec la valeur reçue des données
      console.log('countLikes:', this.countLikes);
    });

    const data = this.route.snapshot.data;
    if (data['tabs'] === false) {
      this.sharedService.updateShowTab(false);
      this.sharedService.updateShowHeader(false);
    }
  }
  ionViewWillEnter() {
    if (this.router.isActive('/actualite', false)) {
      const tabBar = document.querySelector('ion-tab-bar');
      if (tabBar) {
        tabBar.addEventListener('ionTabsDidChange', this.selectActualiteTab);
      }
    }}
    ionViewWillLeave() {
        const tabBar = document.querySelector('ion-tab-bar');
        if (tabBar) {
          tabBar.removeEventListener('ionTabsDidChange', this.selectActualiteTab);
        }
      }
      selectActualiteTab() {
        const tabBar = document.querySelector('ion-tab-bar');
        if (tabBar) {
          const actualiteTab = tabBar.querySelector('[tab="actualite"]');
          if (actualiteTab) {
            const selectEvent = new CustomEvent('ionSelect', { bubbles: true });
            actualiteTab.dispatchEvent(selectEvent);
          }
        }}
  actualites: Actualite[] = [];
 
  getActualites(id: any): void {
    this.actualiteser.getActualiteById(id).subscribe(response => {
      this.actualites = response;
      console.log(response);
      /*
            response.forEach((x: { postId: any; }) => {
              if (x.postId === id) {
                this.comments.push(x);
      
              }
            });*/
    });
  }
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };


ngOnDestroy(): void {
  this.sharedService.reset();
}
}