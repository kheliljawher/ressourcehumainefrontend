import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheEmployePrenom'
})
export class RechercheEmployePrenomPipe implements PipeTransform {

  transform(value:any,term:any ): any {
    console.log("valus is : ",value);

    console.log("prenom Employe is ",term);
    
    
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.prenom.includes(term)));
    }
  }

}
