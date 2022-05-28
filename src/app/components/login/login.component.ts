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

}
