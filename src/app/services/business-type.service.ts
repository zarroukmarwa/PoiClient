import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  constructor(private httpClient: HttpClient) { }

  public findAll() {
    return this.httpClient.get(`${environment.apiBase}/businessType`);
  }
}
