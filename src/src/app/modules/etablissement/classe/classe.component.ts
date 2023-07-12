import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, ModalController, NavController } from '@ionic/angular';
import { EtudiantService } from 'src/app/core/service/etudiant.service';
import { SharedService } from 'src/app/core/service/shared.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss'],
})
export class ClasseComponent implements OnInit {

  constructor(private router: Router, private builder: FormBuilder, private modalController: ModalController, private etudiantservice: EtudiantService, private sharedService: SharedService, private route: ActivatedRoute,private navCtrl: NavController) { }
  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data['tabs'] === false) {
      this.sharedService.updateShowTab(false);
      this.sharedService.updateShowHeader(false);
    }
  }
  classeform: FormGroup = this.builder.group({
    CodeEtablissementEtudiant: [,],

  });
  // Assuming you have already defined the classeform FormGroup in your TypeScript code
  ngOnDestroy(): void {
    this.sharedService.reset();
  }
  
  assignClasseToEtudiant(): void {
    if (this.classeform.valid) {
      const CodeEtablissementEtudiant = this.classeform.value.CodeEtablissementEtudiant;

      this.etudiantservice.assignClasseToEtudiant(CodeEtablissementEtudiant).subscribe(response => {
        console.log(CodeEtablissementEtudiant);
        this.modalController.dismiss().then(() => {
          this.route.queryParams.subscribe(params => {
            if (params['reload']) {
              // Reload the content here
              console.log('Content reloaded');
            }
          });
        });
        console.log('ID de classe affecté à l\'étudiant avec succès.');

      },
        (error: any) => {
          console.error('Une erreur s\'est produite lors de l\'affectation de la classe à l\'étudiant :', error);
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide.');
    }
  }

  currentStep: number = 1;


  navigateToNextStep() {
    this.currentStep++;
    const nextStep = `/step${this.currentStep}`;
    this.navCtrl.navigateForward(nextStep);
  }

  previousStep() {
    this.currentStep--;
    const previousStep = `/step${this.currentStep}`;
    this.navCtrl.navigateBack(previousStep);
  }
}


