import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { PlanningService } from 'src/app/services/planning.service';
import {formatDate} from '@angular/common';
// import Swal from 'sweetalert2'

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  user_connect:any;
  plannings:any;
  employees:any;
  idToDelete:any;
  id: any;
  formPlanning:FormGroup;
  formUpdatePlanning:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  submitted = false;
  test:boolean=false
  p:number=1;

  constructor(private planningsService:PlanningService,
    private employeesService:EmployeService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getPlannings();
    this.getEmployees();
    this.geneFormUpdate();

    this.formPlanning = this.formBuilder.group({
      nom:['',Validators.required],
      date_debut:['',Validators.required],
      date_fin:['',Validators.required],
      //employeID:['',Validators.required]
    })
    //console.log("with out parse : ",localStorage.getItem("user"));
    //console.log("with parse : ",JSON.parse(localStorage.getItem("user")));
    
    
    //this.user_connect = JSON.parse(localStorage.getItem("user"))

  }

  getPlannings(){
    this.planningsService.getPlannings().subscribe(
      (res:any) => {
        this.plannings = res
        console.log("plannings : ",this.plannings)}
    )
  }

  getEmployees(){
    this.employeesService.getEmployees().subscribe(
      (res:any) => {
        this.employees = res
        console.log("employes : ",this.employees)}
    )
  }

  deletePlan(){
    this.planningsService.deletePlan(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getPlannings();
      document.getElementById("del_plan_close").click();

    })
  }

  savePlanning(){ 
    if(this.formPlanning.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formPlanning.value);
      return ;
    }

    console.log("formulaire", this.formPlanning.value)

    /*console.log("formulaire2", {
      "nom": "test3 createddddd",
      "date_debut": "2022-05-26",
      "date_fin": "2022-05-28"
})*/

//this.user_connect.id
    this.planningsService.createPlan(this.formPlanning.value).subscribe( data =>{
      console.log(data);
      this.getPlannings();
      document.getElementById("add_plan_close").click();
      

    })
  }
  sweetAlert(){
    // Swal({
    //   title:'Err',
    //   text:'test',
    //   type:'error'
    // })
  }
  goToPlanningList(){
    this.router.navigateByUrl('/home/planning');
  }

  updatePlanning(){
    console.log("onSubmit")
    console.log("this id ",this.id);
    
    console.log(this.formUpdatePlanning.value);
    this.planningsService.updatePlan(this.formUpdatePlanning.value,this.id).subscribe(
      (res:any) => {
        console.log("planning",res);
        //this.router.navigateByUrl("home/planning")
        this.getPlannings();
      }
    )
    document.getElementById("edit_plan_close").click();

  }

  geneForm(){
    this.formPlanning = this.formBuilder.group({
      nom:"",
      date_debut:"",
      date_fin:"",
      //employeID : ""

    })
  }

  geneFormUpdate(){
    this.formUpdatePlanning = this.formBuilder.group({
      nom:"",
      date_debut:"",
      date_fin:"",
      //employeID : ""

    })
  }

  patchValue(id:any){
    this.id=id;
    console.log("planning id is : ",id)
    this.planningsService.getPlanById(id).subscribe(
      (res:any)=> {
        console.log("planning is :",res);

      this.formUpdatePlanning.patchValue({
      nom:res.nom,
      date_debut:res.date_debut,
      date_fin:res.date_fin,
      //employeID : res.employe.id

    })

      }
    )
    this.test=true;
  }


  sendIdToDelete(id:any){
    this.idToDelete=id;
    console.log("id to delete : ",id);
  }


}
