import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ActualiteService } from 'src/app/core/service/actualite.service';
import { SwiperOptions } from 'swiper';
import {  ViewChild } from '@angular/core';
import { IonTabs, ModalController } from '@ionic/angular';
import { AdminCompoenent } from 'src/app/layouts/admin/admin.component';
import { SharedService } from 'src/app/core/service/shared.service';
import { ActualitedetailsComponent } from './actualitedetails/actualitedetails.component';
@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.scss'],
})
export class ActualiteComponent implements OnInit {
  postlist!: any[];
  isLoading: boolean = false;

  testlike: boolean[] = [true];
  public showTab = true;

  listbool: boolean[] = [];
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

  constructor(private router: Router, 
    private actualiteser: ActualiteService, 
    
        private admin: AdminCompoenent,
        private route: ActivatedRoute,
        private sharedService: SharedService,
        private _change: ChangeDetectorRef,
        private modalController:ModalController


    ) { 

    
    }
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 20,
    // autoplay:true,
  }
 
  async ShowDetails(id: any, isLiked: any) {

    const modal = await this.modalController.create({
      component: ActualitedetailsComponent,
      componentProps: {
        id: id, isLiked: isLiked
      }
    });
    modal.onDidDismiss().then((data) => {
      this. postlist = [];
      this. showpost();
    });

    return await modal.present();
 
    
  }

  likeButtonClick(id: any, index: any): void {
    const likeactualite = {
      ActualiteId: id,

    }
    console.log(likeactualite);
    this.actualiteser.like(likeactualite).subscribe(response => {
      this.postlist[index].isLiked = !this.postlist[index].isLiked;


      if (this.testlike[index]) {


        this.testlike[index] = false;


      }
      else {
        this.testlike[index] = true;

      }

    })
  }
  ngOnInit(): void {
    const data = this.route.snapshot.data;
     this.sharedService.setShowTab(true);
     this.sharedService.showTab$.subscribe(showTab => {
      this.showTab = showTab;
    });

   
    
    this.showpost();
  };

  addLike() {



  }
  // showpost() {
  //   this.isLoading = true; 
  //   this.actualiteser.getAllactualite().subscribe({
  //     next: (response) => {
  //       this.postlist = response;
  //       this.isLoading = false; 
  //     },
  //     error: (error) => {
  //       this.isLoading = false; 
  //     }
  //   });
    
  // }
  showpost() {
    this.isLoading = true;
    this.actualiteser.getAllactualite().subscribe({
      next: (response) => {
        this.postlist = response;
        this.isLoading = false;
        console.log(response)
      },
      error: (error) => {
        this.isLoading = false;
      }
    });

  }
  
  refresh() {
    this.actualiteser.handleRefresh();
  }
  convertToimage(base64: any): string {

    return "data:image/png;base64," + base64;
  }
}
