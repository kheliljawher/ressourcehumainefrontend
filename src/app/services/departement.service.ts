import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { }

  getDepartements(){
    return this.http.get(`${environment.BASE_URL}/departement/getAll`,this.httpOptions);
  }

  getDepartementById(id:any){
    return this.http.get(`${environment.BASE_URL}/departement/${id}`,this.httpOptions);
  }

  /*getDepartementByNom(nom:any){
    return this.http.get(`http://localhost:9191/api/departement/${nom}`);
  }*/

  createDepartement(departement:any){
    return this.http.post(`${environment.BASE_URL}/departement/create`,departement,this.httpOptions);
  }

  updateDepartement(departement:any, id:any){
    return this.http.put(`${environment.BASE_URL}/departement/${id}`,departement,this.httpOptions);
  }

  deleteDepartement(id:any) {
    return this.http.delete(`${environment.BASE_URL}/departement/${id}`,this.httpOptions);
  }

}
