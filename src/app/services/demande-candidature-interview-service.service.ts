import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeCandidatureInterviewServiceService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };


  constructor(private http:HttpClient) { }

  getDemandeCandidatureInterview(DemandeCandidatureInterview:any,id_candidat:any){
    return this.http.post(`${environment.BASE_URL}/api/candidat/sendEmailInterview/${id_candidat}`,DemandeCandidatureInterview,this.httpOptions);
  }
}
