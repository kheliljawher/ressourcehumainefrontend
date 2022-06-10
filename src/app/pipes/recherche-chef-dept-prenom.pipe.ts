import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: ''
})
export class RechercheChefDeptPrenomPipe implements PipeTransform {

  transform(value:any,term:any ): any {
    console.log("valus is : ",value);

    console.log("prenom Chef departement is ",term);
    
    
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.prenom.includes(term)));
    }
  }

}
