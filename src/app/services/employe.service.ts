import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http:HttpClient) { }

  getEmployees(){
    return this.http.get(`http://localhost:9190/api/employe/getAll`);
  }

  getEmpById(id:any){
    return this.http.get(`http://localhost:9190/api/employe/${id}`);
  }

  /*getEmpByNom(nom:any){
    return this.http.get(`http://localhost:9190/api/employe/${nom}`);
  }

  getEmpByPrenom(prenom:any){
    return this.http.get(`http://localhost:9190/api/employe/${prenom}`);
  }*/

  createEmp(employe:any, id_planning:any){
    return this.http.post(`http://localhost:9190/api/employe/create/${id_planning}`,employe);
  }

  updateEmp(employee:any, id_employe:any, id_planning:any){
    return this.http.put(`http://localhost:9190/api/employe/${id_employe}/${id_planning}`,employee);
  }

  deleteEmp(id:any) {
    return this.http.delete(`http://localhost:9190/api/employe/${id}`);
  }

}
