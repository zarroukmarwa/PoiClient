import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Customer } from '../entities/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public findAll() {
    return this.httpClient.get(`${environment.apiBase}/customer`);
  }
  public save(customer: Customer) {
    return this.httpClient.post(`${environment.apiBase}/customer`, customer);
  }

  public findAndCount(criteria: any) {
    return this.httpClient.post(`${environment.apiBase}/customer/findAndCount`, criteria);
  }

  public findById(id: number) {
    return this.httpClient.get(`${environment.apiBase}/customer/${id}`);
  }
}
