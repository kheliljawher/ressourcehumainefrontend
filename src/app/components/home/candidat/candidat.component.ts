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
  }

  getCandidats(){
    this.candidatsService.getCandidats().subscribe(
      (res:any) => {
        this.candidats = res;
        console.log("candidats : ",this.candidats);}
    )
  }

  deleteCandidat(){
    this.candidatsService.deleteCandidat(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getCandidats();
    })
  } 

  public onFileChanged(event:any) {
    //Select File
//        console.log("formGroup : ",this.formCandidat.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ',this.selectedFile)
  }

  sendIdToDelete(id:any){
    this.idToDelete=id;
    console.log("id to delete : ",id);
  }


}
