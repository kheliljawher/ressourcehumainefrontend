import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CongeService } from 'src/app/services/conge.service';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  testEmploye:any;
  user_connect:any;
  employees:any;
  conges:any;
  idToDelete:any;
  id: any;
  formConge:FormGroup; 
  formUpdateConge:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false;
  p:number=1;
  user:any;

  constructor(private congesService:CongeService,
    private employeesService:EmployeService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('user'))

    this.getConges();
    this.getEmployees();
    this.geneFormUpdate();
    this.geneFormConge()
    
    //console.log("with out parse : ",localStorage.getItem("user"));
   // console.log("with parse : ",JSON.parse(localStorage.getItem("user")));
    
    
   // this.user_connect = JSON.parse(localStorage.getItem("user"))
  }



  geneFormConge(){
    this.formConge = this.formBuilder.group({
      date_debut:['',Validators.required],
      date_fin:['',Validators.required],
      type_conge:['',Validators.required],
      ID_Employe:['',Validators.required]      
    })
  }

  emp(){
       console.log("here form ", this.formConge.value)
  }

  

  getConges(){
    this.congesService.getConges().subscribe(
      (res:any) => {
        this.conges = res
        console.log("conges : ",this.conges)}
    )
  }

  getEmployees(){
    this.employeesService.getEmployees().subscribe(
      (res:any) => {
        this.employees = res
        this.testEmploye=res;
        console.log("employes get okkk : ",this.employees)}
    )
  }
  console(event:any){
    console.log("event here is : ",event.target.value);
    
  }


  // getChefDepartements(){
  //   this.chefDepartements.getChefDepartements().subscribe(
  //     (res:any) => {
  //       this.chefDepartements = res
  //       console.log("chef departements get : ",this.chefDepartements)}
  //   )
  // }

  deleteCong(){
    this.congesService.deleteCong(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getConges();
      document.getElementById("del_cong_close").click();

    })
  }

  saveConge(){
    if(this.formConge.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formConge.value);
      return ;
    }    //this.user_connect.id
    this.congesService.createCong(this.formConge.value,this.formConge.value.ID_Employe).subscribe( data =>{
      console.log(data);
      this.getConges();
      document.getElementById("add_cong_close").click();
    })
  }

  goToCongeList(){
    this.router.navigateByUrl('/home/conge');
  }

  updateConge(){
    console.log("onSubmit")
    console.log(this.formUpdateConge.value);
    this.congesService.updateCong(this.formUpdateConge.value,this.id,this.formUpdateConge.value.ID_Employe).subscribe(
      (res:any) => {
        console.log("conge",res);
        this.router.navigateByUrl("home/conge")
        this.getConges();

      }
    )
    document.getElementById("edit_cong_close").click();
  }

  geneForm(){
    this.formConge = this.formBuilder.group({
      date_debut:"",
      date_fin:"",
      type_conge:"",
      ID_Employe : ""

    })
  }


  geneFormUpdate(){
    this.formUpdateConge = this.formBuilder.group({
      date_debut:"",
      date_fin:"",
      type_conge:"",
      ID_Employe : ""

    })
  }

  patchValue(id:any){
    console.log("conge id is : ",id)
    this.congesService.getCongById(id).subscribe(
      (res:any)=> {
        console.log("conge is :",res);
        this.id=id;

      this.formUpdateConge.patchValue({
      id:res.id,
      date_debut:res.date_debut,
      date_fin:res.date_fin,
      type_conge:res.type_conge,
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
