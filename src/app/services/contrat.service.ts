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
    return this.http.get(`http://localhost:9190/api/contrat/${id}`);
  }

  createCont(contrat:any, id_employe:any){
    return this.http.post(`http://localhost:9190/api/contrat/create/${id_employe}`,contrat);
  }

  updateCont(contrat:any, id_contrat:any, id_employe:any){
    return this.http.put(`http://localhost:9190/api/contrat/${id_contrat}/${id_employe}`,contrat);
  }

  deleteCont(id:any) {
    return this.http.delete(`http://localhost:9190/api/contrat/${id}`);
  }

}
