import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe.service';
import { formatDate } from '@angular/common';
import { ChefDepartementService } from 'src/app/services/chef-departement.service';
import { PlanningService } from 'src/app/services/planning.service';
//import { ConfirmedValidator } from './ConfirmedValidator';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

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
  planningID : any;
  plannings:any;

  constructor(private employeesService: EmployeService,
    private planningsService:PlanningService,
    private chefDepartementsService: ChefDepartementService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.getEmployees();
    this.getChefDepartements();
    this.geneFormUpdate();
    this.getPlannings();

    this.formEmploye = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(4)],
      cin: ['', Validators.required, Validators.minLength(8)],
      telephone: ['', Validators.required, Validators.minLength(8)],
      email: ['',  Validators.required, Validators.email],
      adresse: ['', Validators.required],
      poste: ['', Validators.required],
      date_Embauche: ['', Validators.required],
      date_Naissance: ['', Validators.required],
      image: ['', Validators.required],
      role: ['', Validators.required],
      sexs: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      planningID:['',Validators.required]

    },//{      validator: ConfirmedValidator('password', 'confirmPassword')  }
    
    )
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

  getPlannings(){
    this.planningsService.getPlannings().subscribe(
      (res:any) => {
        this.plannings = res
        console.log("plannings : ",this.plannings)}
    )
  }

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

  changeUserUpdate(event:any){
    this.formUpdateEmploye.patchValue({
      role : event.target.value
    })
  }

  saveEmployee() {

    if (this.formEmploye.invalid) {
      this.submitted = true;
      console.log("invalid")
      console.table(this.formEmploye.value);
      //return ;
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
    formData.append("role", this.formEmploye.value.role);
    formData.append("sexs", this.formEmploye.value.sexs);
    formData.append("confirmPassword", this.formEmploye.value.confirmPassword);

    console.log("formulaire", this.formEmploye.value)

    if (this.formEmploye.value.role == "EMPLOYE") {
      this.employeesService.createEmp(formData,this.formEmploye.value.planningID).subscribe(data => {
        console.log(data);
        this.getEmployees();
      })

    } else {if (this.formEmploye.value.role == "CHEFDEPARTEMENT") {

      this.chefDepartementsService.createChefDept(formData).subscribe(data => {
        console.log(data);
        this.getChefDepartements();
      })
    }}

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
    formData.append("role",this.formUpdateEmploye.value.role);
    formData.append("sexs", this.formUpdateEmploye.value.sexs);
    formData.append("confirmPassword",this.formUpdateEmploye.value.confirmPassword);

    console.log("onSubmit")
    console.log(this.formUpdateEmploye.value);

    console.log(this.formEmploye.value.planningID);

    if (this.formEmploye.value.role == "EMPLOYE") {
      this.employeesService.updateEmp(formData, this.id, this.formEmploye.value.planningID).subscribe(data => {
        console.log(data);
        this.getEmployees();
      })

    } else {if (this.formEmploye.value.role == "CHEFDEPARTEMENT"){
      this.chefDepartementsService.updateChefDept(formData, this.id).subscribe(data => {
        console.log(data);
        this.getChefDepartements();
      })
    }}

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
      image: "",
      role: "",
      sexs: "",
      confirmPassword: "",
      planningID : ""


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
      image: "",
      role:"",
      sexs: "",
      confirmPassword: "",
      planningID : ""

    })
  }

  patchValue(res: any) {
    console.log("utilisateur is : ", res)

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
      image: res.image,
      role: res.role,
      sexs: res.sexs,
      confirmPassword: res.confirmPassword,
      planningID :res.planningID

    })

    this.test = true;
  }

  sendIdToDelete(utilisateur: any) {

    this.idToDelete = utilisateur.id;
    console.log("id to delete : ", utilisateur.id);
    console.log("utilisateur is  : ", utilisateur);

    this.roleToDelete = utilisateur.role;

  }

}
