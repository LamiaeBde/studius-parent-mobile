import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonSlides, ModalController, NavController, NavParams } from '@ionic/angular';
import { EtudiantService } from 'src/app/core/service/etudiant.service';
import { OrientationsService } from 'src/app/core/service/orientations.service';
import { SharedService } from 'src/app/core/service/shared.service';

@Component({
  selector: 'app-ajoutorientation',
  templateUrl: './ajoutorientation.component.html',
  styleUrls: ['./ajoutorientation.component.scss'],
})
export class AjoutorientationComponent  implements OnInit,OnDestroy {
  currentStep: number = 1;

  selectedOption: string | undefined;
  @ViewChild(IonSlides) slides!: IonSlides;
id!:any;
  constructor(     private route: ActivatedRoute,
    private sharedService: SharedService,     public navCtrl: NavController,
    private modalController: ModalController,private orientationservice:OrientationsService,
    private builder: FormBuilder,    private router: Router,private etudiantservice:EtudiantService,     private navParams: NavParams,



    ) {route.url.subscribe(() => {
      console.log(route?.snapshot?.data);
     }); }
     Orientationform: FormGroup = this.builder.group({
      titre: [,],
      description: [,],
      accesProfil: ['true'],
    });
     dismissModal() {
      this.modalController.dismiss();
    }
    updateAccesProfil(event: any) {
      this.Orientationform.patchValue({
        accesProfil: event.detail.checked
      });
    }
    
    
    
    
    
    
    
    
    ngOnInit() {

      this.id = this.navParams.get('id');
      console.log('ID:', this.id);
    const data = this.route.snapshot.data;
    if (data['tabs'] === false) {
      this.sharedService.updateShowTab(false);
      this.sharedService.updateShowHeader(false);
    }
  }
  ngOnDestroy(): void {
    this.sharedService.reset();
  }
  step: number = 1; // Initialize the step variable to 1

  nextStep() {
    this.step++; // Increment the step variable when moving to the next step
  }
  slideOpts = {
    // Autres options du swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  
  slideChanged() {
    // Get the current active slide index
    const currentSlideIndex = this.slides.getActiveIndex();
  }
  addOrientation() {
    const postData = {
      titre: this.Orientationform.value.titre,
      description: this.Orientationform.value.description,
      accederProfil: JSON.parse(this.Orientationform.value.accesProfil) // Convertir la chaîne en booléen
    };

    this.etudiantservice.ajouterOrientationByClasse(this.id, postData.titre, postData.description, postData.accederProfil).subscribe(response => {
      console.log(postData);
      this.modalController.dismiss().then(() => {
        this.route.queryParams.subscribe(params => {
          if (params['reload']) {
            console.log('Content reloaded');
          }
        });
      });
      this.router.navigateByUrl('/app/orientation');
      console.log('Success');
    }, error => {
      console.log('Error:', error);
    });
  }
  navigateToNextStep() {
    this.currentStep++;
    const nextStep = `/step${this.currentStep}`;
    this.navCtrl.navigateForward(nextStep);
  }
  
}
