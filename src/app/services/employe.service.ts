import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  token:string=localStorage.getItem('token');
  httpOptions = {
    headers:new HttpHeaders({
      'Authorization':`bearer `+this.token
    })
  };

// token:string=localStorage.getItem('token');

//   httpOptions = {
//     hearders:new HttpHeaders({
//       'Authorization':`beerer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2NTY1ODc3NjUzMjYsImV4cCI6MTY1NjU4ODM2NX0.G_8vnrt97NwmtIblAAMyN5VVKUByFG15S8VysPxfX2TBwOPyKY4YPflxQCbbZ2lQNbonJcQNySt3c-yDTeLqAQ`+this.token
//     })
//   };

  constructor(private http:HttpClient) { }

  getEmployees(){//, this.httpOptions
    return this.http.get(`${environment.BASE_URL}/employe/getAll`,this.httpOptions);
  }

  getEmpById(id:any){
    return this.http.get(`${environment.BASE_URL}/employe/${id}`,this.httpOptions);
  }

  /*getEmpByNom(nom:any){
    return this.http.get(`${environment.BASE_URL}/employe/${nom}`);
  }

  getEmpByPrenom(prenom:any){
    return this.http.get(`${environment.BASE_URL}/employe/${prenom}`);
  }*/
//id_contrat:any
  createEmp(employe:any, id_planning:any, id_departement:any){//${id_contrat}
    return this.http.post(`${environment.BASE_URL}/employe/create/${id_planning}/${id_departement}`,employe,this.httpOptions);
  }

  createEmpWithoutImage(employe:any, id_planning:any, id_departement:any){//${id_contrat}
    return this.http.post(`${environment.BASE_URL}/employe/create/${id_planning}/${id_departement}`,employe,this.httpOptions);
  }

//id_contrat:any
  updateEmp(employee:any, id_employe:any, id_planning:any, id_departement:any){//${id_contrat}
    return this.http.put(`${environment.BASE_URL}/employe/${id_employe}/${id_planning}/${id_departement}`,employee,this.httpOptions);
  }

  setStatusNoActive(id_employe:any){
    return this.http.get(`${environment.BASE_URL}/employe/setStatusNoActive/${id_employe}`,this.httpOptions);
  }

  deleteEmp(id:any) {
    return this.http.delete(`${environment.BASE_URL}/employe/${id}`,this.httpOptions);
  }

  updatePlanning(id_employe:any, id_planning:any){
    return this.http.get(`${environment.BASE_URL}/employe/updatePlanning/${id_employe}/${id_planning}`,this.httpOptions);
  }

}
