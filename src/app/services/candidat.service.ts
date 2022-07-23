import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { }

  getCandidats(){
    return this.http.get(`${environment.BASE_URL}/candidat/getAll`,this.httpOptions);
  }

  sendEmail(){
  return this.http.get(`${environment.BASE_URL}/candidat/sendEmail`,this.httpOptions);
}

  getCandidatById(id:any){
    return this.http.get(`${environment.BASE_URL}/candidat/${id}`,this.httpOptions);
  }

  /*getCandidatByCompetance(competance:any){
    return this.http.get(`${environment.BASE_URL}/candidat/${competance}`);
  }*/

  createCandidat(candidat:any){
    return this.http.post(`${environment.BASE_URL}/candidat/create`,candidat,this.httpOptions);
  }

  updateCandidat(candidat:any, id:any){
    return this.http.put(`${environment.BASE_URL}/candidat/${id}`,candidat,this.httpOptions);
  }

  deleteCandidat(id:any) {
    return this.http.delete(`${environment.BASE_URL}/candidat/${id}`,this.httpOptions);
  }

}
