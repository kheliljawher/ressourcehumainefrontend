import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatureService } from 'src/app/services/candidature.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  candidatures:any;
  idToDelete:any;
  id: any;
  formCandidature:FormGroup;
  formUpdateCandidature:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false

  constructor(private candidaturesService:CandidatureService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCandidatures();
    this.geneFormUpdate();

    this.formCandidature = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required]
    })
  }

  getCandidatures(){
    this.candidaturesService.getCandidatures().subscribe(
      (res:any) => {
        this.candidatures = res
        console.log("candidatures : ",this.candidatures)}
    )
  }

  deleteCandidature(){
    this.candidaturesService.deleteCandidature(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getCandidatures();
    })
  }

  saveCandidature(){
    if(this.formCandidature.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formCandidature.value);
      return ;
    }
    let formData = new FormData();
    formData.append("nom",this.formCandidature.value.nom);
    formData.append("prenom",this.formCandidature.value.prenom);
    formData.append("file",this.selectedFile[0]);

    this.candidaturesService.createCandidature(formData).subscribe( data =>{
      console.log(data);
      this.getCandidatures();
    })
  }

  goToCandidatureList(){
    this.router.navigateByUrl('/home/candidature');
  }

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formEmploye.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  updateCandidature(){
    console.log("onSubmit")
    console.log(this.formUpdateCandidature.value);
    this.candidaturesService.updateCandidature(this.formUpdateCandidature.value,this.id).subscribe(
      (res:any) => {
        console.log("candidature",res);
        this.router.navigateByUrl("home/candidature")

      }
    )
  }

  geneForm(){
    this.formCandidature = this.formBuilder.group({
      id:"",
      nom:""
    })
  }

  geneFormUpdate(){
    this.formUpdateCandidature = this.formBuilder.group({
      id:"",
      nom:""
    })
  }

  patchValue(id:any){
    console.log("emplyee id is : ",id)
    this.candidaturesService.getCandidatureById(id).subscribe(
      (res:any)=> {
        console.log("emplyee is :",res);

      this.formUpdateCandidature.patchValue({
      id:res.id,
      nom:res.nom
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
