import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { }

  getContrats(){
    return this.http.get(`${environment.BASE_URL}/contrat/getAll`,this.httpOptions);
  }

  getContById(id:any){
    return this.http.get(`${environment.BASE_URL}/contrat/${id}`,this.httpOptions);
  }

  createCont(contrat:any, id_utilisateur:any){
    return this.http.post(`${environment.BASE_URL}/contrat/create/${id_utilisateur}`,contrat,this.httpOptions);
  }

  updateCont(contrat:any, id_contrat:any, id_utilisateur:any){
    return this.http.put(`${environment.BASE_URL}/contrat/${id_contrat}/${id_utilisateur}`,contrat,this.httpOptions);
  }

  deleteCont(id:any) {
    return this.http.delete(`${environment.BASE_URL}/contrat/${id}`,this.httpOptions);
  }

}
