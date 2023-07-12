import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActualiteLike } from '../models/actualiteLike';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  apiurl = 'https://localhost:7207/api/Actualites';

  constructor(private _http: HttpClient) { }
  
  getAllactualite(): Observable<any> {
    return  this._http.get<any>(this.apiurl+"/User");
  }
  getActualiteById(id: any): Observable<any> {
    return this._http.get(`${this.apiurl}/${id}`);
  }
  like(actualite:ActualiteLike):Observable<any>{
    
    return this._http.post (`${this.apiurl}/Like`,actualite);
}
handleRefresh() {
  
  location.reload();
}



}
