import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { SidebarComponent } from './components/home/sidebar/sidebar.component';
import { HeaderComponent } from './components/home/header/header.component';
import { EmployeComponent } from './components/home/employe/employe.component';
import { CandidatureComponent } from './components/home/candidature/candidature.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/home/layout/layout.component';
import { PlanningComponent } from './components/home/planning/planning.component';
import { CongeComponent } from './components/home/conge/conge.component';
import { ContratComponent } from './components/home/contrat/contrat.component';
import { CandidatComponent } from './components/home/candidat/candidat.component';
import { UtilisateurComponent } from './components/home/utilisateur/utilisateur.component';
import { ChefDepartementComponent } from './components/home/chef-departement/chef-departement.component';
import { ResponableRHComponent } from './components/home/responable-rh/responable-rh.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { DatePipe } from '@angular/common';
import { RechercheEmployeNamePipe } from './pipes/recherche-employe-name.pipe';
import { RechercheEmployePrenomPipe } from './pipes/recherche-employe-prenom.pipe';
import { RechercheEmployeIdPipe } from './pipes/recherche-employe-id.pipe';
import { RechercheChefDeptIdPipe } from './pipes/recherche-chef-dept-id.pipe';
import { RechercheChefDeptNomPipe } from './pipes/recherche-chef-dept-nom.pipe';
import { RechercheChefDeptPrenomPipe } from './pipes/recherche-chef-dept-prenom.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DepartementComponent } from './components/departement/departement.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    EmployeComponent,
    CandidatureComponent,
    LayoutComponent,
    PlanningComponent,
    CongeComponent,
    ContratComponent,
    CandidatComponent,
    UtilisateurComponent,
    ChefDepartementComponent,
    ResponableRHComponent,
    ProfileComponent,
    RechercheEmployeNamePipe,
    RechercheEmployePrenomPipe,
    RechercheEmployeIdPipe,
    RechercheChefDeptIdPipe,
    RechercheChefDeptNomPipe,
    RechercheChefDeptPrenomPipe,
    DepartementComponent,
    PageNotFoundComponent,
    DashbordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
