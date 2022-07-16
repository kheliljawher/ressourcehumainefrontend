import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  utilisateurs:any;
  formUtilisateur:FormGroup; 
  imageName: any;

  constructor(private utilisateursService:UtilisateurService, private router: Router,
    private formBuilder:FormBuilder) {
   
   }

  ngOnInit(): void {
    this.getUtilisateurs();

    this.formUtilisateur = this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      login:['',Validators.required],
      password:['',Validators.required],
      num_cin:['',Validators.required],
      num_tel:['',Validators.required],
      image:['',Validators.required]
    })
  }

  getUtilisateurs(){
    this.utilisateursService.getUtilisateurs().subscribe(
      (res:any) => {
        this.utilisateurs = res
        console.log("utilisateurs : ",this.utilisateurs)}
    )
  }

}
