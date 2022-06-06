import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(user:any){
    return this.http.post(`http://localhost:9190/api/utilisateur/login`,user);
  }
}
