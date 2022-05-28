import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChefDepartementService } from 'src/app/services/chef-departement.service';
import { CongeService } from 'src/app/services/conge.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  chefDepartements:any;
  conges:any;
  idToDelete:any;
  id: any;
  formConge:FormGroup; 
  formUpdateConge:FormGroup;
  selectedFile:  Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test:boolean=false

  constructor(private congesService:CongeService,
    private chefsDepartementService:ChefDepartementService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.getConges();
    this.getChefDepartements();
    this.geneFormUpdate();

    this.formConge = this.formBuilder.group({
      date_debut:['',Validators.required],
      date_fin:['',Validators.required],
      type_conge:['',Validators.required],
      chefDepartement:['',Validators.required]
      
    })

  }

  getConges(){
    this.congesService.getConges().subscribe(
      (res:any) => {
        this.conges = res
        console.log("conges : ",this.conges)}
    )
  }

  getChefDepartements(){
    this.congesService.getConges().subscribe(
      (res:any) => {
        this.conges = res
        console.log("conges : ",this.conges)}
    )
  }

  deleteCong(){
    this.congesService.deleteCong(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getConges();
    })
  }

  saveConge(){
    if(this.formConge.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formConge.value);
      return ;
    }
    let formData = new FormData();
    formData.append("date_debut",this.formConge.value.date_debut);
    formData.append("date_fin",this.formConge.value.date_fin);
    formData.append("type_conge",this.formConge.value.type_conge);

    formData.append("chefDepartement",this.formConge.value.chefDepartement);

    this.congesService.createCong(formData).subscribe( data =>{
      console.log(data);
      this.getConges();
    })
  }

  goToCongeList(){
    this.router.navigateByUrl('/home/conge');
  }

  updateConge(){
    console.log("onSubmit")
    console.log(this.formUpdateConge.value);
    this.congesService.updateCong(this.formUpdateConge.value,this.id).subscribe(
      (res:any) => {
        console.log("conge",res);
        this.router.navigateByUrl("home/conge")

      }
    )
  }

  geneForm(){
    this.formConge = this.formBuilder.group({
      date_debut:"",
      date_fin:"",
      type_conge:"",
      chefDepartement:""

    })
  }


  geneFormUpdate(){
    this.formUpdateConge = this.formBuilder.group({
      date_debut:"",
      date_fin:"",
      type_conge:"",
      chefDepartement:""

    })
  }

  patchValue(id:any){
    console.log("conge id is : ",id)
    this.congesService.getCongById(id).subscribe(
      (res:any)=> {
        console.log("conge is :",res);
        this.id=id;

      this.formUpdateConge.patchValue({
      id:res.id,
      date_debut:res.date_debut,
      date_fin:res.date_fin,
      type_cong:res.type_cong,
      chefDepartement:res.chefDepartement
      
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
