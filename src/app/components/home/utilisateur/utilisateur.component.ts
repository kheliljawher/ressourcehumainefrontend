import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs:any;
  idToDelete:any;
  id: any;
  formUtilisateur:FormGroup; 
  formUpdateUtilisateur:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false
  constructor(private utilisateursService:UtilisateurService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getUtilisateurs();
    this.geneFormUpdate();

    this.formUtilisateur = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      login:['',Validators.required],
      password:['',Validators.required],
      num_cin:['',Validators.required],
      num_tel:['',Validators.required],
      image:['',Validators.required]
    })
  }

  getUtilisateurs(){
    this.utilisateursService.getUtilisateurs().subscribe(
      (res:any) => {
        this.utilisateurs = res
        console.log("utilisateurs : ",this.utilisateurs)}
    )
  }

  deleteUser(){
    this.utilisateursService.deleteUser(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getUtilisateurs();
    })
  }

  saveUtilisateur(){
    if(this.formUtilisateur.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formUtilisateur.value);
      return ;
    }
    let formData = new FormData();
    formData.append("nom",this.formUtilisateur.value.nom);
    formData.append("prenom",this.formUtilisateur.value.prenom);
    formData.append("login",this.formUtilisateur.value.login);
    formData.append("password",this.formUtilisateur.value.password);
    formData.append("num_cin",this.formUtilisateur.value.num_cin);
    formData.append("num_tel",this.formUtilisateur.value.num_tel);
    formData.append("file",this.selectedFile[0]);


    this.utilisateursService.createUser(formData).subscribe( data =>{
      console.log(data);
      this.getUtilisateurs();
    })
  }

  goToUtilisateurList(){
    this.router.navigateByUrl('/home/utilisateur');
  }

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formUtilisateur.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  updateUtilisateur(){
    console.log("onSubmit")
    console.log(this.formUpdateUtilisateur.value);
    this.utilisateursService.updateUser(this.formUpdateUtilisateur.value,this.id).subscribe(
      (res:any) => {
        console.log("utilisateur",res);
        this.router.navigateByUrl("home/utilisateur")

      }
    )
  }

  geneForm(){
    this.formUtilisateur = this.formBuilder.group({
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
    this.formUpdateUtilisateur = this.formBuilder.group({
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
    console.log("utilisateur id is : ",id)
    this.utilisateursService.getUserById(id).subscribe(
      (res:any)=> {
        console.log("utilisateur is :",res);
        this.id=id;

      this.formUpdateUtilisateur.patchValue({
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
