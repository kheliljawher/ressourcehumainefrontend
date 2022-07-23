import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';
import { DemandeCandidatureInterviewServiceService } from 'src/app/services/demande-candidature-interview-service.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {

  demandeCandidature:any;
  candidatureSelec:any;
  candidatSelec:any;
  candidats:any;
  idToDelete:any;
  id: any;
  formCandidat:FormGroup;
  formCandidatInterviwer:FormGroup
  formUpdateCandidat:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false
  p: number = 1;
  candidature:any;
  demandeCandidatures:any;


  constructor(private candidatsService:CandidatService,
    private demandeCandidature_interview :DemandeCandidatureInterviewServiceService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    // this.candidatsService.sendEmail().subscribe((res:any)=>{
    //   console.log('email done')
    // })
    this.candidature = JSON.parse(localStorage.getItem('detailCandidature'));
//demande candidature getByid
    this.demandeCandidatures = this.candidature.demandeCandidatures
    console.log("demande candidature", this.demandeCandidatures);
    this.geneformCandidat();
    
  }

  getCandidats(){
    this.candidatsService.getCandidats().subscribe(
      (res:any) => {
        this.candidats = res;
        console.log("candidats : ",this.candidats);}
    )
  }

  geneformCandidat(){
    this.formCandidatInterviwer=this.formBuilder.group({
      lien:['',Validators.required],
      date:['',Validators.required]
    })
  }

  setCandidatAndCandidature(demandeCandidature:any){
    console.log("demande is :",demandeCandidature);

    this.demandeCandidature = demandeCandidature;
    
    this.candidatSelec = demandeCandidature.candidat;
    // this.candidatureSelec = demandeCandidature.candidature;

  }

  sendEmail(){
    console.log("formulaire",this.formCandidatInterviwer.value);
    this.demandeCandidature_interview.getDemandeCandidatureInterview(this.formCandidatInterviwer.value, this.candidatSelec.id).subscribe((res:any) =>{
      console.log("email done");
      
    })

    //service update etat demande candidature to interview

  }

  updateEtatToEnAttent(){
    
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
