import { Injectable } from "@angular/core";
import { OAuthEvent, OAuthService, TokenResponse } from "angular-oauth2-oidc";
import { authCodeFlowConfig } from "./config.auth";
import { Router } from "@angular/router";
import { Observable, catchError, map, throwError } from "rxjs";
import { Pays, User, Ville } from "../models/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastService } from "src/shared/toast.service";
import { ToastController } from "@ionic/angular";
import { GetUserProfileResponse } from "../models/GetUserProfileResponse";
import { Etudiant } from "../models/etudiant";
import { UserSignalDto } from "../models/UserSignalDto";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiurl ="https://localhost:7277/api/Accounts";
  identityUrl = "https://localhost:7105/api"
  apiurl2 ="https://localhost:7277/api";
url1="https://localhost:7277";

  httpHeader =  new HttpHeaders({
    'content-type': 'application/json'
  })
  uploadForm: any;
  constructor(
    private oauthService: OAuthService,
    private _router: Router,
    private _http: HttpClient, 
    private _toastService: ToastService,private toastController: ToastController) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(username: any, password: any) {
    this.oauthService.fetchTokenUsingPasswordFlow(username, password).then(() => {
       this._router.navigate(['admin/actualite']);

      this.showSuccessToast();
    }).catch((error) => {
      console.log(error)
      this.showErrorToast();
    });


  }
 
  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Login successful!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  async showInfoToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      color: 'info',
      duration: 2000
    });
    await toast.present();
  }
  async showErrorToast() {
    const toast = await this.toastController.create({
      message: 'Incorrect username or password',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


  

  getProfileCurrentUser(): Observable<any> {

     return this._http.get<GetUserProfileResponse>(`${this.identityUrl}/Accounts/GetProfileCurrentUser`);
    
     }
  refreshToken(): void {
    this.oauthService.refreshToken();
  }

  isLogged(): Boolean {
    return this.oauthService.hasValidAccessToken();
  }


  PostUsers(user:any): Observable<any> {
    const formData = new FormData();
    formData.append('Nom', user['Nom']);
    formData.append('Prenoms', user['Prenoms']);
    formData.append('PhoneNumber', user['PhoneNumber']);
    formData.append('Email', user['Email']);
    formData.append('DateNaissance', user['DateNaissance']);
    formData.append('Password', user['Password']);
    formData.append('ConfirmPassword', user['ConfirmPassword']);
    formData.append('ProfileImage', user['ProfileImage']);
    formData.append('villeId', user['villeId']);




    return this._http.post<User>(
      `${this.apiurl}/register`, formData
    );
  }
  ConfirmAccount(input:any):Observable<any>{
    return this._http.post (`${this.apiurl}/ConfirmUser`,input);
  }



ResendconfirmAccount(useId: any): Observable<any> {
  return this._http.post<any>(
    `${this.apiurl}/ResendCodeConfirmation/${useId}`, this.httpHeader ); 
}
ResetPassword(email: string) {
try{
  const requestBody = { email };
  
  return this._http.post(`${this.apiurl}/Reset-password`, requestBody);

}
catch (error) {
  console.log('Error resetting password:', error);
  throw error;
}
}
getAllPays(): Observable<Pays[]> {
  const url = `${this.identityUrl}/Pays`;
  return this._http.get<Pays[]>(url).pipe(
    map((paysList: any[]) => {
      const idsList = paysList.map(pays => pays.id);
      console.log(idsList); // affiche une liste d'identifiants des pays retournés par la requête HTTP
      return paysList;
    }),
    catchError(error => {
      console.error(error);
      return throwError('Une erreur est survenue lors de la récupération des pays.');
    })
  );
}
getVillesByPaysId(paysId: string): Observable<Ville[]> {
  const url = `${this.identityUrl}/Villes/GetVillesByPaysId/${paysId}`;
  return this._http.get<Ville[]>(url);
}



logout() {
  this.oauthService.logOut();
  location.reload();
}

}