import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  candidats:any;
  idToDelete:any;
  id: any;
  formCandidat:FormGroup;
  formUpdateCandidat:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false

  constructor(private candidatsService:CandidatService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCandidats();
    this.geneFormUpdate();

    this.formCandidat = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
     
    })
  }

  getCandidats(){
    this.candidatsService.getCandidats().subscribe(
      (res:any) => {
        this.candidats = res
        console.log("candidats : ",this.candidats)}
    )
  }

  deleteCandidat(){
    this.candidatsService.deleteCandidat(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getCandidats();
    })
  }

  saveCandidat(){
    if(this.formCandidat.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formCandidat.value);
      return ;
    }
    let formData = new FormData();
    formData.append("nom",this.formCandidat.value.nom);
    formData.append("prenom",this.formCandidat.value.prenom);
    formData.append("file",this.selectedFile[0]);

    this.candidatsService.createCandidat(formData).subscribe( data =>{
      console.log(data);
      this.getCandidats();
    })
  }

  goToCandidatList(){
    this.router.navigateByUrl('/home/candidat');
  }

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formEmploye.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  updateCandidat(){
    console.log("onSubmit")
    console.log(this.formUpdateCandidat.value);
    this.candidatsService.updateCandidat(this.formUpdateCandidat.value,this.id).subscribe(
      (res:any) => {
        console.log("candidat",res);
        this.router.navigateByUrl("home/candidat")

      }
    )
  }

  geneForm(){
    this.formCandidat = this.formBuilder.group({
      id:"",
      nom:""
    })
  }

  geneFormUpdate(){
    this.formUpdateCandidat = this.formBuilder.group({
      id:"",
      nom:""
    })
  }

  patchValue(id:any){
    console.log("emplyee id is : ",id)
    this.candidatsService.getCandidatById(id).subscribe(
      (res:any)=> {
        console.log("emplyee is :",res);

      this.formUpdateCandidat.patchValue({
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
