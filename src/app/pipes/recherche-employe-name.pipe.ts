import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheEmployeName'
})
export class RechercheEmployeNamePipe implements PipeTransform {

  transform(value:any,term:any ): any {
    console.log("valus is : ",value);

    console.log("nomEmploye is ",term);
    
    
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.nom.includes(term)));
    }
  }
  

}
