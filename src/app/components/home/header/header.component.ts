import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user_connect:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user_connect = JSON.parse(localStorage.getItem("user"))
  }

  logout(){
    localStorage.setItem('state',"0");
    this.router.navigateByUrl('login');
  }

}
