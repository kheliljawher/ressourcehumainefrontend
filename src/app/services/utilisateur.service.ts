import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http:HttpClient) { }

  getUtilisateurs(){
    return this.http.get(`http://localhost:9190/api/utilisateur/getAll`);
  }

  getUserById(id:any){
    return this.http.get(`http://localhost:9190/api/utilisateur/${id}`);
  }

  createUser(utilisateur:any){
    return this.http.post(`http://localhost:9190/api/utilisateur/create`,utilisateur);
  }

  updateUser(utilisateur:any,id:any){
    return this.http.put(`http://localhost:9190/v1/utilisateur/${id}`,utilisateur);
  }

  deleteUser(id:any) {
    return this.http.delete(`http://localhost:9191/v1/utilisateur/${id}`);
  }

}
