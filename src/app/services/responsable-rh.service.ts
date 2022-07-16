import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsableRHService {

  constructor(private http:HttpClient) { }

  getResponsableRHs(){
    return this.http.get(`${environment.BASE_URL}/responsableRH/getAll`);
  }

  getRespRHById(id:any){
    return this.http.get(`${environment.BASE_URL}/responsableRH/${id}`);
  }

  createRespRH(responsableRH:any){
    return this.http.post(`${environment.BASE_URL}/responsableRH/create`,responsableRH);
  }

  updateRespRH(responsableRH:any,id:any){
    return this.http.put(`${environment.BASE_URL}/responsableRH/${id}`,responsableRH);
  }

  deleteRespRH(id:any) {
    return this.http.delete(`${environment.BASE_URL}/responsableRH/${id}`);
  }

}
