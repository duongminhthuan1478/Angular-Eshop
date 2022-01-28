import { Category } from './../models/Category';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/v1/categories/');
  }

  getCategoryById(catId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/categories/getCategoryById/${catId}`);
  }

  createCategory(category : Category): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/categories/create', category);
  }

  updateCategory(category : Category): Observable<any> {
    return this.http.put(`http://localhost:3000/api/v1/categories/update/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/v1/categories/delete/${categoryId}`);
  }
}
