import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  employees:any;
  idToDelete:any;
  id: any;
  formEmploye:FormGroup; 
  formUpdateEmploye:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false

  constructor(private employeesService:EmployeService,
    private router: Router,
    private formBuilder:FormBuilder,
    ) { }
  

  ngOnInit(): void {
    this.getEmployees();
    this.geneFormUpdate();

    this.formEmploye = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      login:['',Validators.required],
      password:['', Validators.minLength(4)],
      cin:['',Validators.minLength(8)],
      telephone:['',Validators.minLength(8)],
      email:['',Validators.email],
      adresse:['',Validators.required],
      poste:['',Validators.required],
      date_Embauche:['',Validators.required],
      date_Naissance:['',Validators.required],

      image:['',Validators.required]
    })
  }

  getEmployees(){
    this.employeesService.getEmployees().subscribe(
      (res:any) => {
        this.employees = res
        console.log("employees : ",this.employees)}
    )
  }

  /* getEmployeesbyNom(nom:any){
     this.employeesService.getEmpByNom(nom).subscribe(
       (res:any) => {
         console.log("employe is : ",res)
       }
     )
   }

   getEmployeesbyPrenom(prenom:any){
     this.employeesService.getEmpByPrenom(prenom).subscribe(
       (res:any) => {
         console.log("employe is : ",res)
       }
     )
   }*/

  deleteEmp(){
    
    this.employeesService.deleteEmp(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getEmployees();
      document.getElementById("del_emp_close").click();

    })
          

  }
  

  saveEmployee(){
    // if(this.formEmploye.invalid){
    //   this.submitted=true;
    //   console.log("invalid")
    //   console.table(this.formEmploye.value);
    //   return ;
    // }

    let formData = new FormData();
    formData.append("nom",this.formEmploye.value.nom);
    formData.append("prenom",this.formEmploye.value.prenom);
    formData.append("login",this.formEmploye.value.login);
    formData.append("password",this.formEmploye.value.password);
    formData.append("cin",this.formEmploye.value.cin);
    formData.append("telephone",this.formEmploye.value.telephone);
    formData.append("email",this.formEmploye.value.email);
    formData.append("adresse",this.formEmploye.value.adresse);
    formData.append("poste",this.formEmploye.value.poste);
    formData.append("date_Embauche",this.formEmploye.value.date_Embauche);
    formData.append("date_Naissance",this.formEmploye.value.date_Naissance);
    formData.append("file",this.selectedFile[0]);

    console.log("formulaire", this.formEmploye.value)

    this.employeesService.createEmp(formData).subscribe( data =>{
      console.log(data);
      this.getEmployees();
      document.getElementById("add_emp_close").click();
    })

  }

  goToEmployeeList(){
    this.router.navigateByUrl('/home/employe');
  }

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formEmploye.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  // updateEmployee(id: any){
  //   console.log("updateEmployee")
  //   this.employeesService.updateEmp(this.employeesService.updateEmp,this.id).subscribe( data =>{
  //     console.log(data);
  //     this.goToEmployeeList();
  //   },
  //   error => console.log(error));
  // }

   updateEmploye(){

    let formData = new FormData();
    formData.append("nom",this.formUpdateEmploye.value.nom);
    formData.append("prenom",this.formUpdateEmploye.value.prenom);
    formData.append("login",this.formUpdateEmploye.value.login);
    formData.append("password",this.formUpdateEmploye.value.password);
    formData.append("cin",this.formUpdateEmploye.value.cin);
    formData.append("telephone",this.formUpdateEmploye.value.telephone);
    formData.append("email",this.formUpdateEmploye.value.email);
    formData.append("adresse",this.formUpdateEmploye.value.adresse);
    formData.append("poste",this.formUpdateEmploye.value.poste);
    formData.append("date_Embauche",this.formUpdateEmploye.value.date_Embauche);
    formData.append("date_Naissance",this.formUpdateEmploye.value.date_Naissance);
    formData.append("file",this.selectedFile[0]);
    
    console.log("onSubmit")
    console.log(this.formUpdateEmploye.value);
    this.employeesService.updateEmp(formData,this.id).subscribe(
      (res:any) => {
        console.log("employe",res);
       // this.router.navigateByUrl("home/employe")
        this.getEmployees();
      }
      
    )
    

    document.getElementById("edit_emp_close").click();

  }

  geneForm(){
    this.formEmploye = this.formBuilder.group({
      id:"",
      nom:"",
      prenom:"",
      login:"",
      password:"",
      cin:"",
      telephone:"",
      email:"",
      adresse:"",
      poste:"",
      date_Embauche:"",
      date_Naissance:"",
      image:""

    })
  }


  geneFormUpdate(){
    this.formUpdateEmploye = this.formBuilder.group({
      id:"",
      nom:"",
      prenom:"",
      login:"",
      password:"",
      cin:"",
      telephone:"",
      email:"",
      adresse:"",
      poste:"",
      date_Embauche:"",
      date_Naissance:"",
      image:""

    })
  }

  patchValue(id:any){
    console.log("emplyee id is : ",id)
    this.employeesService.getEmpById(id).subscribe(
      (res:any)=> {
        console.log("emplyee is :",res);
        this.id=id;

      this.formUpdateEmploye.patchValue({
      id:res.id,
      nom:res.nom,
      prenom:res.prenom,
      login:res.login,
      password:res.password,
      cin:res.cin,
      telephone:res.telephone,
      email:res.email,
      adresse:res.adresse,
      poste:res.poste,
      date_Embauche:res.date_Embauche,
      date_Naissance:res.date_Naissance,
      image:res.image

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
