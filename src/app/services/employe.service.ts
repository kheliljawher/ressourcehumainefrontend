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
//id_contrat:any
  createEmp(employe:any, id_planning:any, id_departement:any){//${id_contrat}
    return this.http.post(`http://localhost:9190/api/employe/create/${id_planning}/${id_departement}`,employe);
  }
//id_contrat:any
  updateEmp(employee:any, id_employe:any, id_planning:any, id_departement:any){//${id_contrat}
    return this.http.put(`http://localhost:9190/api/employe/${id_employe}/${id_planning}/${id_departement}`,employee);
  }

  setStatusNoActive(id_employe:any){
    return this.http.get(`http://localhost:9190/api/employe/setStatusNoActive/${id_employe}`);
  }

  deleteEmp(id:any) {
    return this.http.delete(`http://localhost:9190/api/employe/${id}`);
  }

}
