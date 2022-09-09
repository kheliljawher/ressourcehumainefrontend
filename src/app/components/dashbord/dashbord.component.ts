import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {


  pourcentageDepInfo : number;
  pourcentageDepElec : number;
  employeByDepElec : number = 35;
  employeByDepInfo : number = 70;
  employeTotal : number = 140;
  styleDepElec : string="";
  styleDepInfo: string;

  constructor() { }

  ngOnInit(): void {
    this.pourcentageDepElec = this.employeByDepElec * 100 / this.employeTotal ;
    this.pourcentageDepInfo = this.employeByDepInfo * 100 / this.employeTotal ;

    this.styleDepElec = "width: "+this.pourcentageDepElec+"%";
    this.styleDepInfo = "width: "+this.pourcentageDepInfo+"%";


    
  }

}
