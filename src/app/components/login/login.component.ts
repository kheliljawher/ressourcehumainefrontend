import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.geneFormLogin();
  }

  geneFormLogin(){
    this.formLogin = this.fb.group({
      email : '',
      password : ''
    })
  }

  login(){
    if(this.formLogin.value.email == "admin"  && this.formLogin.value.password == "admin" ){
      localStorage.setItem('state','1')
      this.router.navigateByUrl('home');
    }
  }

  logout(){
    localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");

        this.router.navigate(["/login"]);
  }

  isLoggedIn(): boolean {
    let loggedIn: boolean = false;
    let expiration = this.getExpiration();

    if (expiration) {
        return Date.now() < expiration;
    }

    return loggedIn;
}

private getExpiration(): number {
  let expiresAt: number = null;
  
  const expiration = localStorage.getItem("expires_at");

  if (expiration) {
      expiresAt = JSON.parse(expiration);
  }

  return expiresAt;
}

}
