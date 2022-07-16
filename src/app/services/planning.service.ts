import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { }

  getPlanById(id:any){
    return this.http.get(`${environment.BASE_URL}/planning/${id}`,this.httpOptions);
  }

  getPlannings(){
    return this.http.get(`${environment.BASE_URL}/planning/getAll`,this.httpOptions);
  }


//, id_chef_departement:any
  createPlan(planning:any){///${id_chef_departement}
    return this.http.post(`${environment.BASE_URL}/planning/create`,planning,this.httpOptions);
  }

  updatePlan(planning:any, id_planning:any){
    return this.http.put(`${environment.BASE_URL}/planning/${id_planning}`,planning,this.httpOptions);
  }

  deletePlan(id:any) {
    return this.http.delete(`${environment.BASE_URL}/planning/${id}`,this.httpOptions);
  }


}
