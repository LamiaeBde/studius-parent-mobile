import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  apiurl = 'https://localhost:7289/api/Etudiants';
apiurl2='https://localhost:7282/api/Etudiant'
 
  private httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) {

   }
   getEtudiantsCurrentUser(): Observable<string[]> {
    const url = `${this.apiurl}/CurrentUser/Etudiants`;
    return this._http.get<string[]>(url, { headers: this.httpHeader });
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
    formData.append('CodeEtablissementEtudiant', user['CodeEtablissementEtudiant']);

    return this._http.post<User>(
      `${this.apiurl}`, formData
    );  }
  affectUserId(code: string, userId: string): Observable<Etudiant> {
    const etudiant: any = {
      codeEtablissementEtudiant: code,
      userId: userId
    };
  
    return this._http.post<Etudiant>(`${this.apiurl}/userid`, etudiant);
  }
 
  assignClasseToEtudiant(CodeEtablissementEtudiant: string): Observable<any> {
  
    const body = { CodeEtablissementEtudiant: CodeEtablissementEtudiant };
  
    return this._http.post<Etudiant>(`${this.apiurl}/libelleclasse`, body);
  }

  deleteClasse(idclasse: string) {
    return this._http.put(`${this.apiurl}/idclasse?id=${idclasse}`,  this.httpHeader);
  }
  signalConseiller(orientationId: string, Raison: string, bloque: boolean): Observable<any> {
    const requestBody = {
      OrientationId: orientationId,
      Raison: Raison,
    };

    const url = `${this.apiurl2}/SignalConseiller`;

    return this._http.post<any>(url, requestBody, { params: { bloque: bloque.toString() } });
  }
    ajouterOrientationByClasse(classeId: string, titre: string, description: string, accesProfil: boolean): Observable<any> {
      const requestBody = {
        titre: titre,
        description: description,
        accesProfil: accesProfil
      };
      const url = `${this.apiurl}/${classeId}`;
      return this._http.post<any>(url, requestBody);
    }
  }
