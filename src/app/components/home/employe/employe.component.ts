import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { formatDate } from '@angular/common';
import { ChefDepartementService } from 'src/app/services/chef-departement.service';
import { PlanningService } from 'src/app/services/planning.service';
import { DepartementService } from 'src/app/services/departement.service';
import { ContratService } from 'src/app/services/contrat.service';
import { CandidatService } from 'src/app/services/candidat.service';
//import { ConfirmedValidator } from './ConfirmedValidator';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {


  testSelectImage:boolean=false

  roleToDelete: any;
  employees: any[] = []
  chefDepartements: any[] = []
  idToDelete: any;
  id: any;
  formEmploye: FormGroup;
  formUpdateEmploye: FormGroup;
  selectedFile: Array<File> = [];
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  submitted = false;
  test: boolean = false;
  nomEmploye: string = "";
  prenomEmploye: string = "";
  idEmploye: string = "";
  p: number = 1;
  utilisateurs: any[] = []
  planningID: any;
  plannings: any;
  departementID: any;
  departements: any;
  utilisateurToUpdate: any;
  //contrattID:any;
  //contrats:any;

  constructor(private employeesService: EmployeService,
    private planningsService: PlanningService,
    private departementsService: DepartementService,
    private chefDepartementsService: ChefDepartementService,
    //private contratService: ContratService,
    private router: Router,
    private formBuilder: FormBuilder,
    private candidatsService:CandidatService,
  ) { }


  ngOnInit(): void {

    this.candidatsService.sendEmail().subscribe((res:any)=>{
      console.log('email done')
    })

    this.getEmployees();
    this.getChefDepartements();
    this.geneFormUpdate();
    this.getPlannings();
    this.getDepartements();
    //this.getContrats();

    this.formEmploye = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4)],
      cin: ['', Validators.required, Validators.minLength(8)],
      telephone: ['', Validators.required, Validators.minLength(8)],
      email: ['', Validators.required, Validators.email],
      adresse: ['', Validators.required],
      poste: ['', Validators.required],
      date_Embauche: ['', Validators.required],
      date_Naissance: ['', Validators.required],
      //image: ['', Validators.required],
      role: ['', Validators.required],
      sexs: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      planningID: ['', Validators.required],
      departementID: ['', Validators.required],
      //contratID:['',Validators.required]

    },//{      validator: ConfirmedValidator('password', 'confirmPassword')  }

    )
  }

  detailEmploye(emp:any){
    console.log("here détail employe " ,emp);
    localStorage.setItem('id',JSON.stringify(emp)); 
    //this.router.navigateByUrl("/home/candidature-details")
  }

  changePlanning(utilisateur:any,id_planning:any){
    console.log("here emp id ", utilisateur.id," here planning id ",id_planning);
    if(utilisateur.role=="EMPLOYE"){
    this.employeesService.updatePlanning(utilisateur.id, id_planning).subscribe(
      (res:any) => 
      {
        console.log("employees  ");
        this.getEmployees();
      }
    )}else{
      this.chefDepartementsService.updatePlanning(utilisateur.id, id_planning).subscribe(
        (res:any) => 
        {
          console.log("Chef de departement ");
          this.getChefDepartements();
        }
      )
    }
    //localStorage.setItem('id_planning',JSON.stringify(emp)); 
   /// this.router.navigateByUrl("/home/employe")
  }

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

        //this.utilisateurs.push(this.employees[0])

      }
    )
  }

  getPlannings() {
    this.planningsService.getPlannings().subscribe(
      (res: any) => {
        this.plannings = res
        console.log("plannings : ", this.plannings)
      }
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

  // getContrats(){
  //   this.contratsService.getContrats().subscribe(
  //     (res:any) => {
  //       this.contrats = res
  //       console.log("contrats : ",this.contrats)}
  //   )
  // }

  deleteEmp() {

    if (this.roleToDelete == "EMPLOYE") {
      this.employeesService.deleteEmp(this.idToDelete).subscribe(data => {
        console.log(data);
        this.getEmployees();

      })
    } else {
      if (this.roleToDelete == "CHEFDEPARTEMENT") {
        this.chefDepartementsService.deleteChefDept(this.idToDelete).subscribe(data => {
          console.log(data);
          this.getChefDepartements();
        })
      }
    }

    document.getElementById("del_emp_close").click();

  }

  changeSex(event: any) {
    this.formEmploye.patchValue({
      sexs: event.target.value
    })
  }

  changeUser(event: any) {
    this.formEmploye.patchValue({
      role: event.target.value
    })
  }

  changeSexUpdate(event: any) {
    this.formUpdateEmploye.patchValue({
      sexs: event.target.value
    })
  }

  changeUserUpdate(event: any) {
    this.formUpdateEmploye.patchValue({
      role: event.target.value
    })
  }

  saveEmployee() {

    if(this.testSelectImage){
      console.log("service image");
      this.employeesService.createEmp(this.employees, this.formEmploye.value.planningID,this.formEmploye.value.departementID).subscribe(data => {
        console.log(data);
        this.getEmployees();})
    } else {
      console.log("service without image");
       this.employeesService.createEmpWithoutImage(this.employees, this.formEmploye.value.planningID,this.formEmploye.value.departementID).subscribe(data => {
        console.log(data);
        this.getEmployees();})
    }

    if (this.formEmploye.invalid) {
      this.submitted = true;
      console.log("invalid")
      console.table(this.formEmploye.value);
      return ;
    }

    console.log("password :",this.formEmploye.value);
    

    if(this.formEmploye.value.password != this.formEmploye.value.confirmPassword){
      console.log("here mot de pass non confirme");
      // alert('password non confirme')
      return;
      
    }

    console.log("role is : ", this.formEmploye.value.role);

    console.log('form is', this.formEmploye.value);

    let formData = new FormData();
    formData.append("nom", this.formEmploye.value.nom);
    formData.append("prenom", this.formEmploye.value.prenom);
    formData.append("login", this.formEmploye.value.login);
    formData.append("password", this.formEmploye.value.password);
    formData.append("cin", this.formEmploye.value.cin);
    formData.append("telephone", this.formEmploye.value.telephone);
    formData.append("email", this.formEmploye.value.email);
    formData.append("adresse", this.formEmploye.value.adresse);
    formData.append("poste", this.formEmploye.value.poste);
    formData.append("date_Embauche", this.formEmploye.value.date_Embauche);
    formData.append("date_Naissance", this.formEmploye.value.date_Naissance);
    formData.append("file", this.selectedFile[0]);
    this.selectedFile=[]
    formData.append("role", this.formEmploye.value.role);
    formData.append("sexs", this.formEmploye.value.sexs);
    formData.append("confirmPassword", this.formEmploye.value.confirmPassword);

    console.log("formulaire", this.formEmploye.value)

    if (this.formEmploye.value.role == "EMPLOYE") {
      this.employeesService.createEmp(formData, this.formEmploye.value.planningID, this.formEmploye.value.departementID).subscribe(data => {
        console.log(data);
        this.getEmployees();
      })

    } else {
      if (this.formEmploye.value.role == "CHEFDEPARTEMENT") {

        this.chefDepartementsService.createChefDept(formData, this.formEmploye.value.planningID, this.formEmploye.value.departementID).subscribe(data => {
          console.log(data);
          this.getChefDepartements();
        })
      }
    }
    this.selectedFile = []
    document.getElementById("add_emp_close").click();
    
  }

  goToEmployeeList() {
    this.router.navigateByUrl('/home/employe');
  }

  public onFileChanged(event: any) {
    //Select File
    //        console.log("formGroup : ",this.formEmploye.value)
    this.selectedFile = <Array<File>>event.target.files
    console.log('image : ', this.selectedFile)
    this.testSelectImage = true
  }

  updateEmploye() {

    let formData = new FormData();
    formData.append("nom", this.formUpdateEmploye.value.nom);
    formData.append("prenom", this.formUpdateEmploye.value.prenom);
    formData.append("login", this.formUpdateEmploye.value.login);
    formData.append("password", this.formUpdateEmploye.value.password);
    formData.append("cin", this.formUpdateEmploye.value.cin);
    formData.append("telephone", this.formUpdateEmploye.value.telephone);
    formData.append("email", this.formUpdateEmploye.value.email);
    formData.append("adresse", this.formUpdateEmploye.value.adresse);
    formData.append("poste", this.formUpdateEmploye.value.poste);
    formData.append("date_Embauche", this.formUpdateEmploye.value.date_Embauche);
    formData.append("date_Naissance", this.formUpdateEmploye.value.date_Naissance);
    formData.append("file", this.selectedFile[0]);
    this.selectedFile=[]
    formData.append("role", this.formUpdateEmploye.value.role);
    formData.append("sexs", this.formUpdateEmploye.value.sexs);
    formData.append("confirmPassword", this.formUpdateEmploye.value.confirmPassword);
   

    console.log("onSubmit")
    console.log(this.formUpdateEmploye.value);

    console.log(this.formEmploye.value.planningID);

    console.log("password :",this.formEmploye.value);
    

    if(this.formEmploye.value.password != this.formEmploye.value.confirmPassword){
      console.log("here mot de pass non confirme");
      // alert('password non confirme')
      return;
      
    }

    if (this.formUpdateEmploye.value.role == this.utilisateurToUpdate.role) {

      if (this.formUpdateEmploye.value.role == "EMPLOYE") {

        console.log("here employe to employe");
        
        this.employeesService.updateEmp(formData, this.id, this.formUpdateEmploye.value.planningID, this.formUpdateEmploye.value.departementID).subscribe(data => {
          console.log("employe after update role ", data);
          this.getEmployees();
        })

      } else {
        if (this.formUpdateEmploye.value.role == "CHEFDEPARTEMENT") {
        console.log("here chef to chef");

          this.chefDepartementsService.updateChefDept(formData, this.id, this.formUpdateEmploye.value.planningID, this.formUpdateEmploye.value.departementID).subscribe(data => {
            console.log(data);
            this.getChefDepartements();
          })
        }
      }
     
    } else {

      if (this.formUpdateEmploye.value.role == "EMPLOYE") {
        console.log("here chef to employe");

        
        this.chefDepartementsService.setStatusNoActive(this.id).subscribe(data => {
          console.log(data);
          this.getChefDepartements();

        })

        this.employeesService.createEmp(formData,this.formUpdateEmploye.value.planningID, this.formUpdateEmploye.value.departementID).subscribe(data=>{
          this.getEmployees();
        })

        

        

      } else {
        if (this.formUpdateEmploye.value.role == "CHEFDEPARTEMENT") {
        console.log("here employe to chef");


          this.employeesService.setStatusNoActive(this.id).subscribe(data => {
            console.log(data);
            this.getEmployees();
          })

          this.chefDepartementsService.createChefDept(formData,this.formUpdateEmploye.value.planningID, this.formUpdateEmploye.value.departementID).subscribe((res:any)=>{
            console.log("here new chef departement ",res);
            this.getChefDepartements();
            
          })
        }
      }






      // console.log("here to update active to no active and create new utilisateu (employe ou chef )");

      // this.formEmploye.value.setStatusNoActive

      // if (this.formEmploye.value.role == "EMPLOYE") {
      //   this.employeesService.createEmp(formData, this.formEmploye.value.planningID, this.formEmploye.value.departementID).subscribe(data => {
      //     console.log(data);
      //     this.getEmployees();
      //   })
      // } else {
      //   if (this.formEmploye.value.role == "CHEFDEPARTEMENT") {

      //     this.chefDepartementsService.createChefDept(formData, this.formEmploye.value.planningID, this.formEmploye.value.departementID).subscribe(data => {
      //       console.log(data);
      //       this.getChefDepartements();
      //     })
      //   }
      // }

    }

    document.getElementById("edit_emp_close").click();

  }

  geneForm() {
    this.formEmploye = this.formBuilder.group({
      id: "",
      nom: "",
      prenom: "",
      login: "",
      password: "",
      cin: "",
      telephone: "",
      email: "",
      adresse: "",
      poste: "",
      date_Embauche: "",
      date_Naissance: "",
      //image: "",
      role: "",
      sexs: "",
      confirmPassword: "",
      planningID: "",
      departementID: ""
      //contratID : ""

    })
  }

  geneFormUpdate() {
    this.formUpdateEmploye = this.formBuilder.group({
      id: "",
      nom: "",
      prenom: "",
      login: "",
      password: "",
      cin: "",
      telephone: "",
      email: "",
      adresse: "",
      poste: "",
      date_Embauche: "",
      date_Naissance: "",
      //image: "",
      role: "",
      sexs: "",
      confirmPassword: "",
      planningID: "",
      departementID: "",
      actif: ""
      //contratID : ""

    })
  }

  patchValue(res: any) {
    console.log("utilisateur is : ", res)
    this.utilisateurToUpdate = res;
    this.id = res.id;

    this.formUpdateEmploye.patchValue({
      id: res.id,
      nom: res.nom,
      prenom: res.prenom,
      login: res.login,
      password: res.password,
      cin: res.cin,
      telephone: res.telephone,
      email: res.email,
      adresse: res.adresse,
      poste: res.poste,
      date_Embauche: res.date_Embauche,
      date_Naissance: res.date_Naissance,
      // image: res.image,
      role: res.role,
      sexs: res.sexs,
      confirmPassword: res.confirmPassword,
      planningID: res.planning.id,
      departementID: res.departement.id,
      actif: res.actif.id
      //contratID :res.contratID

    })

    this.test = true;
    console.log("form after patch : ", this.formUpdateEmploye.value);

  }

  sendIdToDelete(utilisateur: any) {

    this.idToDelete = utilisateur.id;
    console.log("id to delete : ", utilisateur.id);
    console.log("utilisateur is  : ", utilisateur);

    this.roleToDelete = utilisateur.role;

  }

}
