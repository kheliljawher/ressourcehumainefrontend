import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheChefDeptNom'
})
export class RechercheChefDeptNomPipe implements PipeTransform {

  transform(value:any,term:any ): any {
    console.log("valus is : ",value);

    console.log("nom chef departement is ",term);
    
    
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.nom.includes(term)));
    }
  }

}
