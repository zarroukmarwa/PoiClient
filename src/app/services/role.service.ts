import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Role } from '../entities/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(private httpClient: HttpClient) { }

  public findAll() {
    return this.httpClient.get(`${environment.apiBase}/role`);
  }

  public save(role: Role) {
    return this.httpClient.post(`${environment.apiBase}/role`, role);
  }

  public findAndCount(criteria: any) {
    return this.httpClient.post(`${environment.apiBase}/role/findAndCount`, criteria);
  }

  public findById(id: number) {
    return this.httpClient.get(`${environment.apiBase}/role/${id}`);
  }
}
