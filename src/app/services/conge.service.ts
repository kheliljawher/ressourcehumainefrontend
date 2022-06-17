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

  createCong(conge:any, id_utilisateur:any){
    return this.http.post(`http://localhost:9190/api/conge/create/${id_utilisateur}`,conge);
  }

  updateCong(conge:any, id_conge:any, id_utilisateur:any){
    return this.http.put(`http://localhost:9190/api/conge/${id_conge}/${id_utilisateur}`,conge);
  }

  deleteCong(id:any) {
    return this.http.delete(`http://localhost:9190/api/conge/${id}`);
  }


}
