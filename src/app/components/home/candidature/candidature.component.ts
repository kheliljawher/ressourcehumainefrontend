import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';
import { CandidatureService } from 'src/app/services/candidature.service';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
  candidatures:any;
  /*candidats:any;
  testCandidat:any;*/
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
  p:number=1;
  departementID: any;
  departements: any;
  
  constructor(private candidaturesService:CandidatureService,
    private departementsService: DepartementService,
    /*private candidatsService:CandidatService,*/
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCandidatures();
    /*this.getCandidats();*/
    this.geneFormUpdate();
    this.geneFormCandidature();
    this.getDepartements();

  }

  selectDepartement(event:any){
    console.log("here departement",event.target.value);
    
    // this.formCandidature.patchValue({
    //   departementID : departement.id
    // })
  }

    geneFormCandidature(){
    this.formCandidature = this.formBuilder.group({
      /*offre:['',Validators.required],*/
      titre:['',Validators.required],
      date_debut:['',Validators.required],
      date_fin:['',Validators.required],
      status:['',Validators.required],
      /*applicant:['',Validators.required],*/
      type:['',Validators.required],
      experience:['',Validators.required],
      salaire:['',Validators.required],
      description:['',Validators.required],
      departementID: ['', Validators.required]

    })
  
}
  getCandidatures(){
    this.candidaturesService.getCandidatures().subscribe(
      (res:any) => {
        this.candidatures = res
        console.log("candidatures : ",this.candidatures)}
    )
  }

  getDepartements() {
    this.departementsService.getDepartements().subscribe(
      (res: any) => {
        this.departements = res
        console.log("departements : ", this.departements)
      }
    )
  }

  /*getCandidats(){
    this.candidatsService.getCandidats().subscribe(
      (res:any) => {
        this.candidats = res
        this.testCandidat=res;
        console.log("candidat get okkk : ",this.candidats)}
    )
  }*/
  console(event:any){
    console.log("event here is : ",event.target.value);
    
  }

  deleteCandidature(){
    this.candidaturesService.deleteCandidature(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getCandidatures();
      document.getElementById("del_candidature_close").click();

    })
  }

  saveCandidature(){
    if(this.formCandidature.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formCandidature.value);
      console.log(this.formCandidature.value);

      //return ;
    }
    console.log("departement id ", this.formCandidature.value.departementID);
    
    this.candidaturesService.createCandidature(this.formCandidature.value, this.formCandidature.value.departementID).subscribe( data =>{
      console.log(data);
      this.getCandidatures();

    })
    document.getElementById("add_candidature_close").click();

  }

  goToCandidatureList(){
    this.router.navigateByUrl('/home/candidature');
  }

  updateCandidature(){
    console.log("onSubmit")
    console.log(this.formUpdateCandidature.value);
    this.candidaturesService.updateCandidature(this.formUpdateCandidature.value,this.id, this.formUpdateCandidature.value.departementID).subscribe(
      (res:any) => {
        console.log("candidature",res);
        this.router.navigateByUrl("home/candidature")
        this.getCandidatures();

      }
    )
    document.getElementById("edit_candidature_close").click();

  }

  geneForm(){
    this.formCandidature = this.formBuilder.group({
      /*offre:"",*/
      titre:"",
      date_debut:"",
      date_fin:"",
      status:"",
      applicant:"",
      type:"",
      experience:"",
      salaire:"",
      description:"",
      departementID: ""

    })
  }

  geneFormUpdate(){
    this.formUpdateCandidature = this.formBuilder.group({
      /*offre:"",*/
      titre:"",
      date_debut:"",
      date_fin:"",
      status:"",
      applicant:"",
      type:"",
      experience:"",
      salaire:"",
      description:"",
      departementID: ""

    })
  }

  patchValue(id:any){
    console.log("emplyee id is : ",id)
    this.candidaturesService.getCandidatureById(id).subscribe(
      (res:any)=> {
        console.log("emplyee is :",res);
        this.id=id;

      this.formUpdateCandidature.patchValue({
      /*offre:res.offre,*/
      titre:res.titre,
      date_debut:res.date_debut,
      date_fin:res.date_fin,
      status:res.status,
      applicant:res.applicant,
      type:res.type,
      experience:res.experience,
      salaire:res.salaire,
      description:res.description,
      departementID: res.departement.id,

    })

      }
    )
    this.test=true;
  }

  sendIdToDelete(id:any){
    this.idToDelete=id;
    console.log("id to delete : ",id);
  }

  sendToCandidat(candidature:any){
    localStorage.setItem("detailCandidature",JSON.stringify(candidature));
    this.router.navigateByUrl("/home/candidat");
  }

}
