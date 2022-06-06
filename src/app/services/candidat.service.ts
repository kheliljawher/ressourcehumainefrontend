import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http:HttpClient) { }

  getCandidats(){
    return this.http.get(`http://localhost:9190/api/candidat/getAll`);
  }

  getCandidatById(id:any){
    return this.http.get(`http://localhost:9190/api/candidat/${id}`);
  }

  /*getCandidatByCompetance(competance:any){
    return this.http.get(`http://localhost:9190/api/candidat/${competance}`);
  }*/

  createCandidat(candidat:any){
    return this.http.post(`http://localhost:9190/api/candidat/create`,candidat);
  }

  updateCandidat(candidat:any, id:any){
    return this.http.put(`http://localhost:9190/api/candidat/${id}`,candidat);
  }

  deleteCandidat(id:any) {
    return this.http.delete(`http://localhost:9190/v1/candidat/${id}`);
  }

}
