import { UsersFacade } from './../state/users.facade';
import { User } from '@thuan-fe-apps-workspace/users';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@thuan-env/environment';
import * as countriesLib from 'i18n-iso-countries';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_USERS = environment.API_URL + 'users';

  constructor(
    private http: HttpClient,
    private _userFacade: UsersFacade
  ) {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.API_USERS);
  }

  async getUserCount(): Promise<any> {
    const userCount$ = this.http.get<any>(this.API_USERS + '/count');
    return await lastValueFrom(userCount$);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.API_USERS}/getUserById/${userId}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.API_USERS}/register`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.API_USERS}/update/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.API_USERS}/delete/${userId}`);
  }

  getCountries() {
    return Object.entries(countriesLib.getNames('en', {select: "official"})).map(val => {
      return { id: val[0],  name: val[1] }
    });
  }

  getCountryName(countryCode: string) {
    return countriesLib.getName(countryCode, "en");
  }

  initAppSession() {
    this._userFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this._userFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this._userFacade.isAuthenticated$;
  }
}
