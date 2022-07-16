import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http:HttpClient) { }

  getUtilisateurs(){
    return this.http.get(`${environment.BASE_URL}/utilisateur/getAll`);
  }

  getUserById(id:any){
    return this.http.get(`${environment.BASE_URL}/utilisateur/${id}`);
  }

  createUser(utilisateur:any){
    return this.http.post(`${environment.BASE_URL}/utilisateur/create`,utilisateur);
  }

  updateUser(utilisateur:any,id:any){
    return this.http.put(`${environment.BASE_URL}/utilisateur/${id}`,utilisateur);
  }

  deleteUser(id:any) {
    return this.http.delete(`${environment.BASE_URL}/utilisateur/${id}`);
  }

}
