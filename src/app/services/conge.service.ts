import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { }

  getConges(){
    return this.http.get(`${environment.BASE_URL}/conge/getAll`,this.httpOptions);
  }

  getCongById(id:any){
    return this.http.get(`${environment.BASE_URL}/conge/${id}`,this.httpOptions);
  }

  createCong(conge:any, id_utilisateur:any){
    return this.http.post(`${environment.BASE_URL}/conge/create/${id_utilisateur}`,conge,this.httpOptions);
  }

  updateCong(conge:any, id_conge:any, id_utilisateur:any){
    return this.http.put(`${environment.BASE_URL}/conge/${id_conge}/${id_utilisateur}`,conge,this.httpOptions);
  }

  deleteCong(id:any) {
    return this.http.delete(`${environment.BASE_URL}/conge/${id}`,this.httpOptions);
  }


}
