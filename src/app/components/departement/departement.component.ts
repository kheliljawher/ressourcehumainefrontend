import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  departements:any;
  idToDelete:any;
  id: any;
  formDepartement:FormGroup;
  formUpdateDepartement:FormGroup;
  base64Data: any;
  retrieveResonse: any;
  submitted = false;
  test:boolean=false
  p:number=1;
  
  constructor(private departementsService:DepartementService,
    private router: Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.getDepartements();
    this.geneFormUpdate();
    this.geneFormDepartement();
  }

  geneFormDepartement(){
    this.formDepartement = this.formBuilder.group({
      nom:['',Validators.required]

    })
  
}

detailDepartement(departement:any){
console.log("departement selectionne : ",departement);

}

getDepartements(){
  this.departementsService.getDepartements().subscribe(
    (res:any) => {
      this.departements = res
      console.log("departements : ",this.departements);
      this.departements.forEach(element => {
      console.log("department : ",element?.nom," nombre d'employe : ",element?.utilisateurs?.length);
      
    });
    
    }
  )
}

console(event:any){
  console.log("event here is : ",event.target.value);
  
}

deleteDepartement(){
  this.departementsService.deleteDepartement(this.idToDelete).subscribe( data => {
    console.log(data);
    this.getDepartements();
    document.getElementById("del_dept_close").click();

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Departement deleted successfully'
    })

  })
}

saveDepartement(){
  if(this.formDepartement.invalid){
    this.submitted=true;
    console.log("invalid")
    console.table(this.formDepartement.value);
    console.log(this.formDepartement.value);

    return ;
  }

  this.departementsService.createDepartement(this.formDepartement.value).subscribe( data =>{
    console.log(data);
    
    this.getDepartements();

  })

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Departement created successfully'
  })


  document.getElementById("add_dept_close").click();

  
}

goToDepartementList(){
  this.router.navigateByUrl('/home/departement');
}

updateDepartement(){
  console.log("onSubmit")
  console.log(this.formUpdateDepartement.value);
  this.departementsService.updateDepartement(this.formUpdateDepartement.value,this.id).subscribe(
    (res:any) => {
      console.log("departement",res);
      this.router.navigateByUrl("home/departement")
      this.getDepartements();

    }
  )
  document.getElementById("edit_dept_close").click();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Departement update successfully'
  })

}

geneForm(){
  this.formDepartement = this.formBuilder.group({
    nom:""

  })
}

geneFormUpdate(){
  this.formUpdateDepartement = this.formBuilder.group({
    nom:""

  })
}

patchValue(id:any){
  console.log("emplyee id is : ",id)
  this.departementsService.getDepartementById(id).subscribe(
    (res:any)=> {
      console.log("departement is :",res);
      this.id=id;

    this.formUpdateDepartement.patchValue({
    nom:res.nom
  
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
