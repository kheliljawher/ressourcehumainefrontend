import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rechercheChefDeptId'
})
export class RechercheChefDeptIdPipe implements PipeTransform {

  transform(value:any,term:any ): any {
    console.log("valus is : ",value);

    console.log("id Chef departement is ",term);
    
    
    if(term==null){
      return value;
    }else{
      return value.filter((item:any)=>(item.id.includes(term)));
    }
  }

}
