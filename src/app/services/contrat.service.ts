import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http:HttpClient) { }

  getContrats(){
    return this.http.get(`http://localhost:9190/api/contrat/getAll`);
  }

  getContById(id:any){
    return this.http.get(`http://localhost:9190/api/v1/contrat/${id}`);
  }

  createCont(contrat:any){
    return this.http.post(`http://localhost:9190/api/contrat/create`,contrat);
  }

  updateCont(contrat:any,id:any){
    return this.http.put(`http://localhost:9190/api/contrat/${id}`,contrat);
  }

  deleteCont(id:any) {
    return this.http.delete(`http://localhost:9190/api/contrat/${id}`);
  }

}
