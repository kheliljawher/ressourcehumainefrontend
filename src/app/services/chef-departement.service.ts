import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChefDepartementService {

  constructor(private http:HttpClient) { }

  getChefDepartements(){
    return this.http.get(`http://localhost:9190/api/chefDepartement/`);
  }

  getChefDeptById(id:any){
    return this.http.get(`http://localhost:9190/api/chefDepartement/${id}`);
  }

  createChefDept(chefDepartement:any){
    return this.http.post(`http://localhost:9190/api/chefDepartement/`,chefDepartement);
  }

  updateChefDept(chefDepartement:any, id:any){
    return this.http.put(`http://localhost:9190/api/chefDepartement/${id}`,chefDepartement);
  }

  deleteChefDept(id:any) {
    return this.http.delete(`http://localhost:9190/v1/chefDepartement/${id}`);
  }
}
