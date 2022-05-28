import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsableRHService {

  constructor(private http:HttpClient) { }

  getResponsableRHs(){
    return this.http.get(`http://localhost:9190/api/responsableRH/getAll`);
  }

  getRespRHById(id:any){
    return this.http.get(`http://localhost:9190/api/responsableRH/${id}`);
  }

  createRespRH(responsableRH:any){
    return this.http.post(`http://localhost:9190/api/responsableRH/create`,responsableRH);
  }

  updateRespRH(responsableRH:any,id:any){
    return this.http.put(`http://localhost:9190/v1/responsableRH/${id}`,responsableRH);
  }

  deleteRespRH(id:any) {
    return this.http.delete(`http://localhost:9191/v1/responsableRH/${id}`);
  }

}
