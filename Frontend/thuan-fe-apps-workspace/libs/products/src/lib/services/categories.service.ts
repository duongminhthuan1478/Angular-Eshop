import { Category } from './../models/Category';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '@thuan-env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_CATEGORIES = environment.API_URL + 'categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_CATEGORIES);
  }

  getCategoryById(catId: string): Observable<any> {
    return this.http.get<any>(`${this.API_CATEGORIES}/getCategoryById/${catId}`);
  }

  createCategory(category : Category): Observable<any> {
    return this.http.post(`${this.API_CATEGORIES}/create`, category);
  }

  updateCategory(category : Category): Observable<any> {
    return this.http.put(`${this.API_CATEGORIES}/update/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.API_CATEGORIES}/delete/${categoryId}`);
  }
}
