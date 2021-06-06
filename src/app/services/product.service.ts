import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Product } from '../entities/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public findAll() {
    return this.httpClient.get(`${environment.apiBase}/product`);
  }

  public save(product: Product) {
    return this.httpClient.post(`${environment.apiBase}/product`, product);
  }

  public findAndCount(criteria: any) {
    return this.httpClient.post(`${environment.apiBase}/product/findAndCount`, criteria);
  }

  public findById(id: number) {
    return this.httpClient.get(`${environment.apiBase}/product/${id}`);
  }

}
