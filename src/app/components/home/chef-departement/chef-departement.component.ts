import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { ChefDepartementService } from 'src/app/services/chef-departement.service';

@Component({
  selector: 'app-chef-departement',
  templateUrl: './chef-departement.component.html',
  styleUrls: ['./chef-departement.component.css']
})
export class ChefDepartementComponent implements OnInit {
  chefDepartements:any;
  idToDelete:any;
  id: any;
  formChefDepartement:FormGroup; 
  formUpdateChefDepartement:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false;
  nomChefDepartement:string="";
  prenomChefDepartement:string="";
  idChefDepartement:string="";

  constructor(private chefDepartementsService:ChefDepartementService,
    private router: Router,
    private formBuilder:FormBuilder,
    ) { }
  

  ngOnInit(): void {
    this.getChefDepartements();
    this.geneFormUpdate();

    this.formChefDepartement = this.formBuilder.group({
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

  getChefDepartements(){
    this.chefDepartementsService.getChefDepartements().subscribe(
      (res:any) => {
        this.chefDepartements = res
        console.log("chef departements : ",this.chefDepartements)}
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

  deleteChefDept(){
    
    this.chefDepartementsService.deleteChefDept(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getChefDepartements();
      document.getElementById("del_chef_close").click();

    })
          

  }
  

  saveChefDepartement(){
    // if(this.formEmploye.invalid){
    //   this.submitted=true;
    //   console.log("invalid")
    //   console.table(this.formEmploye.value);
    //   return ;
    // }

    let formData = new FormData();
    formData.append("nom",this.formChefDepartement.value.nom);
    formData.append("prenom",this.formChefDepartement.value.prenom);
    formData.append("login",this.formChefDepartement.value.login);
    formData.append("password",this.formChefDepartement.value.password);
    formData.append("cin",this.formChefDepartement.value.cin);
    formData.append("telephone",this.formChefDepartement.value.telephone);
    formData.append("email",this.formChefDepartement.value.email);
    formData.append("adresse",this.formChefDepartement.value.adresse);
    formData.append("poste",this.formChefDepartement.value.poste);
    formData.append("date_Embauche",this.formChefDepartement.value.date_Embauche);
    formData.append("date_Naissance",this.formChefDepartement.value.date_Naissance);
    formData.append("file",this.selectedFile[0]);

    console.log("formulaire", this.formChefDepartement.value)

    this.chefDepartementsService.createChefDept(formData).subscribe( data =>{
      console.log(data);
      this.getChefDepartements();
      document.getElementById("add_chef_close").click();
    })

  }

  goToChefDepartementList(){
    this.router.navigateByUrl('/home/chefDepartement');
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

  //  updateChefDepartement(){

  //   let formData = new FormData();
  //   formData.append("nom",this.formUpdateChefDepartement.value.nom);
  //   formData.append("prenom",this.formUpdateChefDepartement.value.prenom);
  //   formData.append("login",this.formUpdateChefDepartement.value.login);
  //   formData.append("password",this.formUpdateChefDepartement.value.password);
  //   formData.append("cin",this.formUpdateChefDepartement.value.cin);
  //   formData.append("telephone",this.formUpdateChefDepartement.value.telephone);
  //   formData.append("email",this.formUpdateChefDepartement.value.email);
  //   formData.append("adresse",this.formUpdateChefDepartement.value.adresse);
  //   formData.append("poste",this.formUpdateChefDepartement.value.poste);
  //   formData.append("date_Embauche",this.formUpdateChefDepartement.value.date_Embauche);
  //   formData.append("date_Naissance",this.formUpdateChefDepartement.value.date_Naissance);
  //   formData.append("file",this.selectedFile[0]);
    
  //   console.log("onSubmit")
  //   console.log(this.formUpdateChefDepartement.value);
  //   this.chefDepartementsService.updateChefDept(formData,this.id).subscribe(
  //     (res:any) => {
  //       console.log("chef departement",res);
  //      // this.router.navigateByUrl("home/chefDepartement")
  //       this.getChefDepartements();
  //     }
      
  //   )
    

  //   document.getElementById("edit_chef_close").click();

  // }

  geneForm(){
    this.formChefDepartement = this.formBuilder.group({
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
    this.formUpdateChefDepartement = this.formBuilder.group({
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
    this.chefDepartementsService.getChefDeptById(id).subscribe(
      (res:any)=> {
        console.log("chef departement is :",res);
        this.id=id;

      this.formUpdateChefDepartement.patchValue({
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
