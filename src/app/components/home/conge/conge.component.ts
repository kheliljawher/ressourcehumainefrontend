import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChefDepartementService } from 'src/app/services/chef-departement.service';
import { CongeService } from 'src/app/services/conge.service';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  testEmploye:any;
  user_connect:any;
  employees:any;
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
  test:boolean=false;
  p:number=1;
  user:any;
  utilisateurs: any[] = []
  chefDepartements: any[] = [];
  congeDeMaladie:any;

  constructor(private congesService:CongeService,
    private employeesService:EmployeService,
    private chefDepartementsService: ChefDepartementService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.user=JSON.parse(localStorage.getItem('user'))

    this.geneFormConge();
    this.getEmployees();
    this.geneFormUpdate();
    
    this.getChefDepartements();
    
    console.log("with out parse : ",localStorage.getItem("user"));
    console.log("with parse : ",JSON.parse(localStorage.getItem("user")));
    
    
    this.user_connect = JSON.parse(localStorage.getItem("user"))
    this.getCongess();

    this.congesService.gerCongeByType(this.user_connect.id,'Congé de Maladie').subscribe((res:any) => {
      console.log("here conge by type :",res);
      this.congeDeMaladie = res
      
    })

  }

  changeConge(conge: any){
    console.log("here conge id ", conge.id);
    console.log("here conge status ", conge?.status);
  }

  geneFormConge(){
    this.formConge = this.formBuilder.group({
      date_debut:['',Validators.required],
      date_fin:['',Validators.required],
      type_conge:['',Validators.required],
      ID_Employe:['',Validators.required]      
    })
  }

  emp(){
       console.log("here form ", this.formConge.value)
  }

  

  getCongess(){
    // if user.role == responsable RH or admin 
    this.congesService.getConges().subscribe(
      (res:any) => {
        this.conges = res
        console.log("conges : ",this.conges)}
    )
    

    // else service getAllCongeByIdUserConnecte ()
    // this.conge = res

  }

  // getEmployees(){
  //   this.employeesService.getEmployees().subscribe(
  //     (res:any) => {
  //       this.employees = res
  //       this.testEmploye=res;
  //       console.log("employes get okkk : ",this.employees)}
  //   )
  // }
  // console(event:any){
  //   console.log("event here is : ",event.target.value);
    
  // }


  // getChefDepartements(){
  //   this.chefDepartements.getChefDepartements().subscribe(
  //     (res:any) => {
  //       this.chefDepartements = res
  //       console.log("chef departements get : ",this.chefDepartements)}
  //   )
  // }

  getEmployees() {
    this.employeesService.getEmployees().subscribe(
      (res: any) => {
        this.employees = res
        console.log("employees : ", this.employees)
        this.utilisateurs = [];

        this.chefDepartements.forEach(element => {
          this.utilisateurs.push(element)
        });
        this.employees.forEach(element => {
          this.utilisateurs.push(element)
        });
        console.log("Liste utilisateur from employe",this.utilisateurs);
      }
    )
  }

  getChefDepartements() {
    this.chefDepartementsService.getChefDepartements().subscribe(
      (res: any) => {
        this.chefDepartements = res
        console.log("chef departements : ", this.chefDepartements)
        this.utilisateurs = [];
        this.chefDepartements.forEach(element => {
          this.utilisateurs.push(element)
        });
        this.employees.forEach(element => {
          this.utilisateurs.push(element)
        });

        console.log("Liste utilisateur from chef",this.utilisateurs);


        //this.utilisateurs.push(this.employees[0])

      }
    )
  }

  deleteCong(){
    this.congesService.deleteCong(this.idToDelete).subscribe( data => {
      console.log(data);
      this.getCongess();
      document.getElementById("del_cong_close").click();

    })
  }

  saveConge(){
    console.log("here form gourp ",this.formConge.value)
    
    if(this.formConge.invalid){
      this.submitted=true;
      console.log("invalid")
      console.table(this.formConge.value);
      return ;
    }    //this.user_connect.id
    this.congesService.createCong(this.formConge.value,this.formConge.value.ID_Employe).subscribe( data =>{
      console.log("here conge value :",data);
      this.getCongess();
      document.getElementById("add_cong_close").click();
    })
  }

  goToCongeList(){
    this.router.navigateByUrl('/home/conge');
  }

  updateConge(){
    console.log("onSubmit")
    console.log(this.formUpdateConge.value);
    this.congesService.updateCong(this.formUpdateConge.value,this.id,this.formUpdateConge.value.ID_Employe).subscribe(
      (res:any) => {
        console.log("conge",res);
        this.router.navigateByUrl("home/conge")
        this.getCongess();

      }
    )
    document.getElementById("edit_cong_close").click();
  }

  geneForm(){
    this.formConge = this.formBuilder.group({
      date_debut:"",
      date_fin:"",
      type_conge:"",
      ID_Employe : ""

    })
  }


  geneFormUpdate(){
    this.formUpdateConge = this.formBuilder.group({
      date_debut:"",
      date_fin:"",
      type_conge:"",
      ID_Employe : ""

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
      type_conge:res.type_conge,
      ID_Employe : res.utilisateur.id
      
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
