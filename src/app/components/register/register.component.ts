import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefDepartementService } from 'src/app/services/chef-departement.service';
import { DepartementService } from 'src/app/services/departement.service';
import { EmployeService } from 'src/app/services/employe.service';
import { LoginService } from 'src/app/services/login.service';
import { PlanningService } from 'src/app/services/planning.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formEmploye:FormGroup;
  submitted = false;
  formLogin:FormGroup;
  employe:any;
  employees: any[] = []
  chefDepartements: any[] = []

  utilisateurs: any[] = []
  planningID: any;
  plannings: any;
  departementID: any;
  departements: any;

  constructor(private employesService:EmployeService,
    private planningsService: PlanningService,
    private departementsService: DepartementService,
    private chefDepartementsService: ChefDepartementService,
    private router: Router,
    private formBuilder:FormBuilder,
    private activated:ActivatedRoute,
    private loginService:LoginService,
    private registerService:RegisterService) { }

  ngOnInit(): void {

    this.getEmployees();
    this.getChefDepartements();
    this.getPlannings();
    this.getDepartements();

    this.formLogin=this.formBuilder.group({
      username:"",
      password:"",
      nom:"",
      prenom:"",
      email:"",
      telephone:"",
      //date_Embauche:""
      // cv:"",
      // lettreMotivation:""
    })

    this.formEmploye = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      email:['',Validators.required],
      telephone:['',Validators.required],
      //date_Embauche:['',Validators.required]
    })

  }

  getEmployees() {
    this.employesService.getEmployees().subscribe(
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


  saveEmploye(){
    if(this.formEmploye.invalid){
      this.submitted=true;

      console.log("invalid")
      console.log(this.formEmploye.value);
      return ;
    }
    let formData = new FormData();
    formData.append("login",this.formEmploye.value.username);
    formData.append("password",this.formEmploye.value.password);
    formData.append("nom",this.formEmploye.value.nom);
    formData.append("prenom",this.formEmploye.value.prenom);
    formData.append("email",this.formEmploye.value.email);
    formData.append("telephone",this.formEmploye.value.telephone);
    //formData.append("date_Embauche",this.formCandidat.value.date_Embauche);

    this.employesService.createEmp(this.employees, this.formEmploye.value.planningID,this.formEmploye.value.departementID).subscribe( data =>{
      console.log(data);
      this.router.navigateByUrl('login');

      //this.changeForm2();      
    })
  }

}
