import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user_connect:any;
  role:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user_connect = JSON.parse(localStorage.getItem("user"))
    console.log("user from side bar :",this.user_connect);
    this.role=this.user_connect.role;
  }

  logout(){
    localStorage.setItem('state',"0");
    this.router.navigateByUrl('login');
  }

}
