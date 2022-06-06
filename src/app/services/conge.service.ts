import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  constructor(private http:HttpClient) { }

  getConges(){
    return this.http.get(`http://localhost:9190/api/conge/getAll`);
  }

  getCongById(id:any){
    return this.http.get(`http://localhost:9190/api/conge/${id}`);
  }

  createCong(conge:any, id_employe:any){
    return this.http.post(`http://localhost:9190/api/conge/create/${id_employe}`,conge);
  }

  updateCong(conge:any, id_conge:any){
    return this.http.put(`http://localhost:9190/api/conge/${id_conge}`,conge);
  }

  deleteCong(id:any) {
    return this.http.delete(`http://localhost:9190/api/conge/${id}`);
  }


}
