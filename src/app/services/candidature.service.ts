import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  constructor(private http:HttpClient) { }

  getCandidatures(){
    return this.http.get(`http://localhost:9190/api/candidature/getAll`);
  }

  getCandidatureById(id:any){
    return this.http.get(`http://localhost:9190/api/candidature/${id}`);
  }

  /*getCandidatureByNom(nom:any){
    return this.http.get(`http://localhost:9191/api/candidature/${nom}`);
  }*/

  createCandidature(candidature:any, id_departement:any){
    return this.http.post(`http://localhost:9190/api/candidature/create/${id_departement}`,candidature);
  }
//
  updateCandidature(candidature:any, id_candidature:any, id_departement:any){
    return this.http.put(`http://localhost:9190/api/candidature/${id_candidature}/${id_departement}`,candidature);
  }

  deleteCandidature(id:any) {
    return this.http.delete(`http://localhost:9190/api/candidature/${id}`);
  }


}
