import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;


    if(localStorage.getItem('state') == "1") {
      this.router.navigateByUrl('home');
      return false;
    } else {
      return true;
    }

    // si state == 0 return true

    // else navigate by url home
  }
  
}
