import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
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
      employe:['',Validators.required]
    })
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
    })
  }

  savePlanning(){ 
    if(this.formPlanning.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formPlanning.value);
      return ;
    }

    console.log("formulaire", this.formPlanning.value.employe)
    

    this.planningsService.createPlan(this.formPlanning.value,this.formPlanning.value.employe).subscribe( data =>{
      console.log(data);
      this.getPlannings();
    })
  }

  goToPlanningList(){
    this.router.navigateByUrl('/home/planning');
  }

  updatePlanning(){
    console.log("onSubmit")
    console.log(this.formUpdatePlanning.value);
    this.planningsService.updatePlan(this.formUpdatePlanning.value,this.id).subscribe(
      (res:any) => {
        console.log("planning",res);
        this.router.navigateByUrl("home/planning")

      }
    )
  }

  geneForm(){
    this.formPlanning = this.formBuilder.group({
      nom:"",
      date_debut:"",
      date_fin:"",
      employe : ""

    })
  }

  geneFormUpdate(){
    this.formUpdatePlanning = this.formBuilder.group({
      nom:"",
      date_debut:"",
      date_fin:"",
      employe : ""

    })
  }

  patchValue(id:any){
    console.log("planning id is : ",id)
    this.planningsService.getPlanById(id).subscribe(
      (res:any)=> {
        console.log("planning is :",res);

      this.formUpdatePlanning.patchValue({
      nom:res.nom,
      date_debut:res.date_debut,
      date_fin:res.date_fin,
      employe : res.employe

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
