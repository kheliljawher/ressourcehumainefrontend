import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http:HttpClient) { }

  getDepartements(){
    return this.http.get(`http://localhost:9190/api/departement/getAll`);
  }

  getDepartementById(id:any){
    return this.http.get(`http://localhost:9190/api/departement/${id}`);
  }

  /*getDepartementByNom(nom:any){
    return this.http.get(`http://localhost:9191/api/departement/${nom}`);
  }*/

  createDepartement(departement:any){
    return this.http.post(`http://localhost:9190/api/departement/create`,departement);
  }

  updateDepartement(departement:any, id:any){
    return this.http.put(`http://localhost:9190/api/departement/${id}`,departement);
  }

  deleteDepartement(id:any) {
    return this.http.delete(`http://localhost:9190/api/departement/${id}`);
  }

}
