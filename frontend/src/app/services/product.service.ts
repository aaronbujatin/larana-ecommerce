import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductById(id: number) {
    return this.httpClient.get(`${environment.API_GATEWAY}/api/v1/products/${id}`);
  }

  getProductsRecommendations(id: number) {
    return this.httpClient.get(`${environment.API_GATEWAY}/api/v1/products/recommendations/${id}`);
  }

  getProductsByCategories(category: string) {
    let params = new HttpParams().set('category', category);
    return this.httpClient.get(`${environment.API_GATEWAY}/api/v1/products/search`, { params })
  }


}
