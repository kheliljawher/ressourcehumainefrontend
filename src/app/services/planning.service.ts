import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  constructor(private http:HttpClient) { }

  getPlannings(){
    return this.http.get(`http://localhost:9190/api/planning/getAll`);
  }

  getPlanById(id:any){
    return this.http.get(`http://localhost:9190/api/planning/${id}`);
  }

  createPlan(planning:any, id_employe:any, id_chef_departement:any){
    return this.http.post(`http://localhost:9190/api/planning/create/${id_employe}/${id_chef_departement}`,planning);
  }

  updatePlan(planning:any, id_planning:any){
    return this.http.put(`http://localhost:9190/api/planning/${id_planning}`,planning);
  }

  deletePlan(id:any) {
    return this.http.delete(`http://localhost:9190/api/planning/${id}`);
  }


}
