import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { ActionRoles } from '../entities/actionroles';

@Injectable({
  providedIn: 'root'
})
export class ActionrolesService {

  constructor(private httpClient: HttpClient) { }

  public findAll() {
    return this.httpClient.get(`${environment.apiBase}/actionroles`);
  }

  public save(actionrole: ActionRoles) {
    return this.httpClient.post(`${environment.apiBase}/actionroles`, actionrole);
  }

  public findAndCount(criteria: any) {
    return this.httpClient.post(`${environment.apiBase}/actionroles/findAndCount`, criteria);
  }

  public findById(id: number) {
    return this.httpClient.get(`${environment.apiBase}/actionroles/${id}`);
  }

}
