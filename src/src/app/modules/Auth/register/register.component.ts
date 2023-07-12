import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Pays, Ville } from 'src/app/core/models/user';
import { catchError, of, tap } from 'rxjs';
import { EtudiantService } from 'src/app/core/service/etudiant.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy, OnInit {
  event!: File;
  paysList: Pays[] = [];
  villeList: Ville[] = []; selectedPaysId!: string;
  Userform: FormGroup = this.builder.group({
    Nom: [,],
    Prenoms: [,],
    PhoneNumber: [,],
    Email: [,],
    DateNaissance: [,],
    Password: [,],
    ConfirmPassword: [,],
    ProfileImage: [,],
    villeId: [,],
    CodeEtablissementEtudiant:[,],
  });;
  constructor(private builder: FormBuilder, private authservice: AuthService, private router: Router,
    private etudiantservice: EtudiantService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.loadPaysList();
  }


  qrString = 'This is a secret qr code message';
  scannedResult: any;

  filechange(event: any) {
    this.Userform.controls['ProfileImage'].setValue(event.target.files[0])
    console.log(event.target.files[0])

  } image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';


  signUp() {

    const phone = this.Userform.controls['PhoneNumber'].value;
    this.Userform.controls['PhoneNumber'].setValue(phone.internationalNumber);
     this.etudiantservice.PostUsers(this.Userform.value).subscribe({
      next: (val: any) => {
       

              console.log("success");


              this.router.navigate(['/auth/confirm', val]);
            },
            error: (err: any) => {
              console.error(err);
            },
          });



       

    }

    
  


  selectedImage: any;
  checkPlatformweb() {
    if (Capacitor.getPlatform() == 'web') return true;
    return false;

  }
  async addPhoto() {

    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      width: 600,
      resultType: CameraResultType.Base64
    });
    this.Userform.controls['ProfileImage'].setValue(this.b64toBlob(image.base64String, `image/${image.format}`));
    this.selectedImage = image;
    if (this.checkPlatformweb()) this.selectedImage.webPath = image.dataUrl;
  }


  b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  loadPaysList(): void {
    this.authservice.getAllPays().subscribe({
      next: (paysList: Pays[]) => {
        this.paysList = paysList;
      },
      error: (error: any) => console.error(error)
    });

  }

  loadVillesByPaysId(e: any) {
    console.log(e.detail.value);
    this.authservice.getVillesByPaysId(e.detail.value).pipe(
      tap(() => console.log('Selected country ID:', e.detail.value)),
      catchError(error => {
        console.error('Error retrieving list of cities:', error);
        return of([]);
      })
    ).subscribe(
      villeList => {
        this.villeList = villeList;
        console.log('List of cities retrieved successfully:', villeList);
      }
    );
  }
}
