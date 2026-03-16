import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://pharma-backend-fdfh.onrender.com/api/products';

  constructor(private http: HttpClient) { }

  getAllProducts(category?: string, search?: string): Observable<any[]> {
    let url = this.apiUrl;
    const params = new URLSearchParams();

    if (category) {
      params.append('category', category);
    }
    if (search) {
      params.append('search', search);
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    return this.http.get<any[]>(url);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, productData);
  }

  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFarmerProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/farmer/my-products`);
  }
}
