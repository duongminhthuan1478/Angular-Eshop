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
}
