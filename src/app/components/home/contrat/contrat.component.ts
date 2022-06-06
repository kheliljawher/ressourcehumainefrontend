import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratService } from 'src/app/services/contrat.service';
import {formatDate} from '@angular/common';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {

  testEmploye:any;

  contrats:any;
  employees:any;
  idToDelete:any;
  id: any;
  formContrat:FormGroup; 
  formUpdateContrat:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false

  constructor(private contratsService:ContratService,
    private employeesService:EmployeService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getContrats();
    this.getEmployees();
    this.geneFormUpdate();

    this.formContrat = this.formBuilder.group({
      type_contrat:['',Validators.required],
      date_debut:['',Validators.required],
      date_fin:['',Validators.required],
      salaire:['',Validators.required],
      ID_Employe:['',Validators.required]
    
    })
  }

  getContrats(){
    this.contratsService.getContrats().subscribe(
      (res:any) => {
        this.contrats = res
        console.log("contrats : ",this.contrats)}
    )
  }

  getEmployees(){
    this.employeesService.getEmployees().subscribe(
      (res:any) => {
        this.employees = res;
        this.testEmploye=res;
        console.log("employes get : ",this.employees)}
    )
  }

  deleteCont(){
    this.contratsService.deleteCont(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getContrats();
      document.getElementById("del_cont_close").click();
    })
  }

  saveContrat(){
    if(this.formContrat.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formContrat.value);
      return ;
    }
    console.table(this.formContrat.value);

    

    this.contratsService.createCont(this.formContrat.value,this.formContrat.value.ID_Employe).subscribe( data =>{
      console.log(data);
      this.getContrats();
      document.getElementById("add_cont_close").click();

    })
  }

  goToContratList(){
    this.router.navigateByUrl('/home/contrat');
  }

  updateContrat(){
    console.log("onSubmit")
    console.log(this.formUpdateContrat.value);
    this.contratsService.updateCont(this.formUpdateContrat.value,this.id).subscribe(
      (res:any) => {
        console.log("contrat",res);
        this.router.navigateByUrl("home/contrat")
        this.getContrats();
      }
    )
    document.getElementById("edit_cont_close").click();

  }

  geneForm(){
    this.formContrat = this.formBuilder.group({
      type_contrat:"",
      date_debut:"",
      date_fin:"",
      salaire:"",
      ID_Employe:""

    })
  }


  geneFormUpdate(){
    this.formUpdateContrat = this.formBuilder.group({
      type_contrat:"",
      date_debut:"",
      date_fin:"",
      salaire:"",
      ID_Employe : ""

    })
  }

  patchValue(id:any){
    console.log("contrat id is : ",id)
    this.contratsService.getContById(id).subscribe(
      (res:any)=> {
        console.log("contrat is :",res);
        this.id=id;

      this.formUpdateContrat.patchValue({
      type_contrat:res.type_contrat,
      date_debut:res.date_debut,
      date_fin:res.date_fin,
      salaire:res.salaire,
      ID_Employe : res.ID_Employe

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
