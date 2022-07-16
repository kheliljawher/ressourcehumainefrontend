import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token:string=localStorage.getItem('token');

  httpOptions = {
    hearders:new HttpHeaders({
      'Authorization':`beerer `+this.token
    })
  };

  constructor(private http:HttpClient) { }

  login(user:any){
    return this.http.post(`http://localhost:9190/user`,user);
  }
}
