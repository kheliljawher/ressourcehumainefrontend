import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChefDepartementService {

  constructor(private http:HttpClient) { }

  getChefDepartements(){
    return this.http.get(`http://localhost:9190/api/chefDepartement/getAll`);
  } 

  getChefDeptById(id:any){
    return this.http.get(`http://localhost:9190/api/chefDepartement/${id}`);
  }

  createChefDept(chefDepartement:any, id_planning:any, id_departement:any){
    return this.http.post(`http://localhost:9190/api/chefDepartement/create/${id_planning}/${id_departement}`,chefDepartement);
  }

  updateChefDept(chefDepartement:any, id_chef_departement:any, id_planning:any, id_departement:any){
    return this.http.put(`http://localhost:9190/api/chefDepartement/${id_chef_departement}/${id_planning}/${id_departement}`,chefDepartement);
  }

  deleteChefDept(id:any) {
    return this.http.delete(`http://localhost:9190/api/chefDepartement/${id}`);
  }
}
