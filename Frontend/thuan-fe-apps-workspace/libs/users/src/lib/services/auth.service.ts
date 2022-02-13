import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@thuan-env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_USERS = environment.API_URL + 'users';

  constructor(private http: HttpClient, private router: Router) {
 
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_USERS}/login`, { email, password });
  }

  logout() {
    localStorage.removeItem(environment.LS.TOKEN);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem(environment.LS.TOKEN);
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if(token)  {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this.isTokenExpired(tokenDecode.exp);
    }
    return false;
  }

  getUserIdFromToken() {
    // userId được gửi từ section payload của token trả về, có thể check trong jwt.io 
    const token = this.getToken();
    if(token)  {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return tokenDecode?.userId || null;
    }
    return null;
  }

  private isTokenExpired(expiration: number): boolean {
    // timestamp/1000 => 13 -> 10digits equally to expiration timestamp
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  
}
