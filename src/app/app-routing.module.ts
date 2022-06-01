import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatComponent } from './components/home/candidat/candidat.component';
import { CandidatureComponent } from './components/home/candidature/candidature.component';
import { ChefDepartementComponent } from './components/home/chef-departement/chef-departement.component';
import { CongeComponent } from './components/home/conge/conge.component';
import { ContratComponent } from './components/home/contrat/contrat.component';
import { EmployeComponent } from './components/home/employe/employe.component';
import { HomeComponent } from './components/home/home/home.component';
import { LayoutComponent } from './components/home/layout/layout.component';
import { PlanningComponent } from './components/home/planning/planning.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { ResponableRHComponent } from './components/home/responable-rh/responable-rh.component';
import { UtilisateurComponent } from './components/home/utilisateur/utilisateur.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './gards/auth.guard';
import { LogoutGuard } from './gards/logout.guard';

const routes: Routes = [
  {path:"home",component:HomeComponent, canActivate:[AuthGuard], children:[
    {path:"layout",component:LayoutComponent},
    {path:"employe",component:EmployeComponent},
    {path:"planning",component:PlanningComponent},
    {path:"conge",component:CongeComponent},
    {path:"contrat",component:ContratComponent},
    {path:"candidature",component:CandidatureComponent},
    {path:"candidat",component:CandidatComponent},
    {path:"utilisateur",component:UtilisateurComponent},
    {path:"responsableRH",component:ResponableRHComponent},
    {path:"chefDepartement",component:ChefDepartementComponent},
    {path:"profile",component:ProfileComponent}

  ]},
  {path:"login",component:LoginComponent, canActivate:[LogoutGuard]},
  {path:"register",component:RegisterComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
