import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orientations } from '../models/Orientations';
import { Message } from '../models/Message';
import { MessageDto } from '../models/MessageDto';
import {  HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrientationsService {

  private apiUrl = 'https://localhost:7282/api/Orientation';
  
  private apiUrl2='https://localhost:7282/api/Etudiant'
  constructor(private http: HttpClient) { }

  getOrientationsByConseiller(): Observable<Orientations[]> {
    return this.http.get<Orientations[]>(`${this.apiUrl}/ByConseiller`);
  }

  getOrientationById(id: any): Observable<Orientations> {
    return this.http.get<Orientations>(`${this.apiUrl}/${id}/detailOreintation`);
  }

  updateOrientationStatus(id: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/UpdateStatus/${id}`, {});
  }
  
  postOrientation(orientation:any) :Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}`, orientation);

  }
  getOrientationByIdEtudiant(idEtudiant: any): Observable<any> {
    const params = new HttpParams().set('idEtudiant', idEtudiant);
    return this.http.get<any>(`${this.apiUrl}/ByEtudiant`, { params });
  }
  
  getMessagesByOrientation(orientationId: string): Observable<Message[]> {
    const url = `${this.apiUrl}/${orientationId}/Messagesconseiller`;
    return this.http.get<Message[]>(url);
  }
  postMessage(orientationId: string, messageDto: MessageDto): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/Messages?orientationId=${orientationId}`, messageDto);
  }
  
  inviteParents(orientationId: string): Observable<any> {
    const url = `${this.apiUrl}/${orientationId}/InviteParents`;
    return this.http.post<any>(url, {});
  }
  checkOrientationStatus(orientationId: string): Observable<any> {
    const url = `${this.apiUrl}/${orientationId}/CheckOrientationStatus`;
    return this.http.get<any>(url);
  }
  getEtudiantParents(orientationId: string): Observable<any> {
    const url = `${this.apiUrl2}/${orientationId}/parents`;
    return this.http.get<any>(url);
  }

  finirOrientation(orientationId: string): Observable<any> {
    const url = `${this.apiUrl}/orientations/${orientationId}/FinirOrientation`;
    return this.http.post<any>(url, {});
  }
  Accepterdemandeacces(orientationId: string): Observable<any> {
    const url = `${this.apiUrl2}/${orientationId}/accept-profile-access`;
    return this.http.post<any>(url, {});
  }

  inviteParent(orientationId: string, parentId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.apiUrl2}/select-parent`;
    const body = { parentId: parentId,
      orientationId: orientationId };
    return this.http.post<any>(url, body,httpOptions);
  }
 
}