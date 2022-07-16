import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChefDepartementService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };

  constructor(private http:HttpClient) { }

  getChefDepartements(){
    return this.http.get(`${environment.BASE_URL}/chefDepartement/getAll`,this.httpOptions);
  } 

  getChefDeptById(id:any){
    return this.http.get(`${environment.BASE_URL}/chefDepartement/${id}`,this.httpOptions);
  }

  createChefDept(chefDepartement:any, id_planning:any, id_departement:any){
    return this.http.post(`${environment.BASE_URL}/chefDepartement/create/${id_planning}/${id_departement}`,chefDepartement,this.httpOptions);
  }

  setStatusNoActive(id_departement:any){
    return this.http.get(`${environment.BASE_URL}/chefDepartement/setStatusNoActive/${id_departement}`,this.httpOptions);
  }

  updateChefDept(chefDepartement:any, id_chef_departement:any, id_planning:any, id_departement:any){
    return this.http.put(`${environment.BASE_URL}/chefDepartement/${id_chef_departement}/${id_planning}/${id_departement}`,chefDepartement,this.httpOptions);
  }

  deleteChefDept(id:any) {
    return this.http.delete(`${environment.BASE_URL}/chefDepartement/${id}`,this.httpOptions);
  }

  updatePlanning(id_chef_departement:any, id_planning:any){
    return this.http.get(`${environment.BASE_URL}/chefDepartement/updatePlanning/${id_chef_departement}/${id_planning}`,this.httpOptions);
  }
}
