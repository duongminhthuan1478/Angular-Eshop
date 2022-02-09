import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '@thuan-env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    const token = this._auth.getToken();
    if(token)  {
      // Token have 3 parts: header(algorithm), payload(data), signature(secreKey),
      // I only need to encode only data payload and check user is Admin or not
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode.isAdmin && !this.isTokenExpired(tokenDecode.exp))  return true;
    }
   
    this.router.navigate(['/login']);
    return false;
  }

  private isTokenExpired(expiration: number): boolean {
    // timestamp/1000 => 13 -> 10digits equally to expiration timestamp
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
  
}
