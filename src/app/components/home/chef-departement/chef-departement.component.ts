import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  formChedDepartement:FormGroup; 
  formUpdateChefDepartement:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false

  constructor(private chefDepartementsService:ChefDepartementService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getChefDepartements();
    this.geneFormUpdate();

    this.formChedDepartement = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      login:['',Validators.required],
      password:['',Validators.required],
      num_cin:['',Validators.required],
      num_tel:['',Validators.required],
      image:['',Validators.required]
    })
  }

  getChefDepartements(){
    this.chefDepartementsService.getChefDepartements().subscribe(
      (res:any) => {
        this.chefDepartements = res
        console.log("chef departement : ",this.chefDepartements)}
    )
  }

  deleteChefDept(){
    this.chefDepartementsService.deleteChefDept(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getChefDepartements();
    })
  }

  saveChefDepartement(){
    if(this.formChedDepartement.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formChedDepartement.value);
      return ;
    }
    let formData = new FormData();
    formData.append("nom",this.formChedDepartement.value.nom);
    formData.append("prenom",this.formChedDepartement.value.prenom);
    formData.append("login",this.formChedDepartement.value.login);
    formData.append("password",this.formChedDepartement.value.password);
    formData.append("num_cin",this.formChedDepartement.value.num_cin);
    formData.append("num_tel",this.formChedDepartement.value.num_tel);
    formData.append("file",this.selectedFile[0]);


    this.chefDepartementsService.createChefDept(formData).subscribe( data =>{
      console.log(data);
      this.getChefDepartements();
    })
  }

  goToChefDepartementList(){
    this.router.navigateByUrl('/home/chefDepartement');
  }

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formChefDepartement.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  // updateChefDepartement(id: any){
  //   console.log("updateChefDepartement")
  //   this.chefDepartementsService.updateEmp(this.chefDepartementsService.updateEmp,this.id).subscribe( data =>{
  //     console.log(data);
  //     this.goToChefDepartementList();
  //   },
  //   error => console.log(error));
  // }

  updateChefDepartement(){
    console.log("onSubmit")
    console.log(this.formUpdateChefDepartement.value);
    this.chefDepartementsService.updateChefDept(this.formUpdateChefDepartement.value,this.id).subscribe(
      (res:any) => {
        console.log("chef departement",res);
        this.router.navigateByUrl("home/chefDepartement")

      }
    )
  }

  geneForm(){
    this.formChedDepartement = this.formBuilder.group({
      id:"",
      nom:"",
      prenom:"",
      login:"",
      password:"",
      num_cin:"",
      num_tel:"",
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
      num_cin:"",
      num_tel:"",
      image:""

    })
  }

  patchValue(id:any){
    console.log("chef departement id is : ",id)
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
      num_cin:res.num_cin,
      num_tel:res.num_tel,
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
