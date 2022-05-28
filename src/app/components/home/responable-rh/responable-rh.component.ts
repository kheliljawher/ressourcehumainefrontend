import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponsableRHService } from 'src/app/services/responsable-rh.service';

@Component({
  selector: 'app-responable-rh',
  templateUrl: './responable-rh.component.html',
  styleUrls: ['./responable-rh.component.css']
})
export class ResponableRHComponent implements OnInit {
  responsableRHs:any;
  idToDelete:any;
  id: any;
  formResponsableRH:FormGroup; 
  formUpdateResponsableRH:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false

  constructor(private responsableRHsService:ResponsableRHService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getResponsableRHs();
    this.geneFormUpdate();

    this.formResponsableRH = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      login:['',Validators.required],
      password:['',Validators.required],
      num_cin:['',Validators.required],
      num_tel:['',Validators.required],
      image:['',Validators.required]
    })
  }

  getResponsableRHs(){
    this.responsableRHsService.getResponsableRHs().subscribe(
      (res:any) => {
        this.responsableRHs = res
        console.log("responsable RHs : ",this.responsableRHs)}
    )
  }

  deleteRespRH(){
    this.responsableRHsService.deleteRespRH(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getResponsableRHs();
    })
  }

  saveResponsableRH(){
    if(this.formResponsableRH.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formResponsableRH.value);
      return ;
    }
    let formData = new FormData();
    formData.append("nom",this.formResponsableRH.value.nom);
    formData.append("prenom",this.formResponsableRH.value.prenom);
    formData.append("login",this.formResponsableRH.value.login);
    formData.append("password",this.formResponsableRH.value.password);
    formData.append("num_cin",this.formResponsableRH.value.num_cin);
    formData.append("num_tel",this.formResponsableRH.value.num_tel);
    formData.append("file",this.selectedFile[0]);


    this.responsableRHsService.createRespRH(formData).subscribe( data =>{
      console.log(data);
      this.getResponsableRHs();
    })
  }

  goToResponsableRHList(){
    this.router.navigateByUrl('/home/responsableRH');
  }

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formResponsableRH.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  // updateResponsableRH(id: any){
  //   console.log("updateResponsableRH")
  //   this.responsableRHsService.updateRespRH(this.responsableRHsService.updateRespRH,this.id).subscribe( data =>{
  //     console.log(data);
  //     this.goToResponsableRHList();
  //   },
  //   error => console.log(error));
  // }

  updateResposableRH(){
    console.log("onSubmit")
    console.log(this.formUpdateResponsableRH.value);
    this.responsableRHsService.updateRespRH(this.formUpdateResponsableRH.value,this.id).subscribe(
      (res:any) => {
        console.log("responsable RH",res);
        this.router.navigateByUrl("home/responsableRH")

      }
    )
  }

  geneForm(){
    this.formResponsableRH = this.formBuilder.group({
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
    this.formUpdateResponsableRH = this.formBuilder.group({
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
    console.log("responsable rh id is : ",id)
    this.responsableRHsService.getRespRHById(id).subscribe(
      (res:any)=> {
        console.log("responsable rh is :",res);
        this.id=id;

      this.formUpdateResponsableRH.patchValue({
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
