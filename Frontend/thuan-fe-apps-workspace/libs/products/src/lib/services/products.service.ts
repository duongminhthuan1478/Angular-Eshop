import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@thuan-env/environment';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_PRODUCTS = environment.API_URL + 'products';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_PRODUCTS);
  }

  geProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.API_PRODUCTS}/getProductById/${productId}`);
  }
  
  getFeaturedProducts(count: number): Observable<any> {
    return this.http.get<any>(`${this.API_PRODUCTS}/list-product-featured/${count}`);
  }

  async getProductCount(): Promise<any> {
    const productCount$ = this.http.get<any>(this.API_PRODUCTS + '/count');
    return await lastValueFrom(productCount$);
  }

  createProduct(productFormData: FormData): Observable<any> {
    return this.http.post(`${this.API_PRODUCTS}/create`, productFormData);
  }

  updateProduct(productFormData : FormData, productId: string): Observable<any> {
    return this.http.put(`${this.API_PRODUCTS}/update/${productId}`, productFormData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.API_PRODUCTS}/delete/${productId}`);
  }
}
