import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private apiUrl = 'https://localhost:7289/api/Classes';

  constructor(private http: HttpClient) { }
  deleteClasse(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
  
    return this.http.delete(url);
  }  
  getClasseByIdEtudiant(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }  
  archiverClasse(classeId: string): Observable<any> {
    const url = `${this.apiUrl}`; // Replace with the correct URL of your API
  
    const params = new HttpParams().set('classeId', classeId);
  
    return this.http.post(url, null, { params });
  }
  getIdEtudiant(classeId: string): Observable<any> {
    const url = `${this.apiUrl}/EtudiantsByClasse/${classeId}`;
    return this.http.get<any>(url);
  }
  
}