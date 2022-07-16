import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup
  constructor(private fb:FormBuilder,private router:Router,private loginService:LoginService) { }

  ngOnInit(): void {
    this.geneFormLogin();
  }

  geneFormLogin(){
    this.formLogin = this.fb.group({
      username : '',
      password : ''
    })
  }

  login(){
    console.log("login is :",this.formLogin.value);
    
    this.loginService.login(this.formLogin.value).subscribe((res:any)=> {
      if(res != null)
      {
        console.log("my data : ",res);
        
        localStorage.setItem('state','1');
        localStorage.setItem('token',res.token);
        localStorage.setItem('user',JSON.stringify(res.utilisateur));
        console.log("user in local storage is like :",JSON.stringify(res));        
        this.router.navigateByUrl('home');
      }
    })

  }

  logout(){
    localStorage.removeItem("token");
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
