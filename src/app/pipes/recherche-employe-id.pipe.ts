import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheEmployeId'
})
export class RechercheEmployeIdPipe implements PipeTransform {

  transform(value:any,term:any ): any {
    console.log("valus is : ",value);

    console.log("id Employe is ",term);
    
    
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.id.includes(term)));
    }
  }

}
