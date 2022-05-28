import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContratService } from 'src/app/services/contrat.service';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {

  contrats:any;
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
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getContrats();
    this.geneFormUpdate();

    this.formContrat = this.formBuilder.group({
      type_contrat:['',Validators.required],
      date_debut:['',Validators.required],
      date_fin:['',Validators.required],
      saaire:['',Validators.required]
    
    })
  }

  getContrats(){
    this.contratsService.getContrats().subscribe(
      (res:any) => {
        this.contrats = res
        console.log("contrats : ",this.contrats)}
    )
  }

  deleteCont(){
    this.contratsService.deleteCont(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getContrats();
    })
  }

  saveContrat(){
    if(this.formContrat.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formContrat.value);
      return ;
    }
    let formData = new FormData();
    formData.append("type_contrat",this.formContrat.value.type_contrat);
    formData.append("date_debut",this.formContrat.value.date_debut);
    formData.append("date_fin",this.formContrat.value.date_fin);
    formData.append("salaire",this.formContrat.value.saaire);

    this.contratsService.createCont(formData).subscribe( data =>{
      console.log(data);
      this.getContrats();
    })
  }

  goToContratList(){
    this.router.navigateByUrl('/home/contrat');
  }

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formContrat.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  updateContrat(){
    console.log("onSubmit")
    console.log(this.formUpdateContrat.value);
    this.contratsService.updateCont(this.formUpdateContrat.value,this.id).subscribe(
      (res:any) => {
        console.log("contrat",res);
        this.router.navigateByUrl("home/contrat")

      }
    )
  }

  geneForm(){
    this.formContrat = this.formBuilder.group({
      id:"",
      type_contrat:"",
      date_debut:"",
      date_fin:"",
      salaire:""

    })
  }


  geneFormUpdate(){
    this.formUpdateContrat = this.formBuilder.group({
      id:"",
      type_contrat:"",
      date_debut:"",
      date_fin:"",
      salaire:""

    })
  }

  patchValue(id:any){
    console.log("contrat id is : ",id)
    this.contratsService.getContById(id).subscribe(
      (res:any)=> {
        console.log("contrat is :",res);
        this.id=id;

      this.formUpdateContrat.patchValue({
      id:res.id,
      type_contrat:res.type_contrat,
      date_debut:res.date_debut,
      date_fin:res.date_fin,
      salaire:res.salaire

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
