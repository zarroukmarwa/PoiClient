import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Action } from '../entities/action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private httpClient: HttpClient) { }

  public findAll() {
    return this.httpClient.get(`${environment.apiBase}/action`);
  }

  public save(action: Action) {
    return this.httpClient.post(`${environment.apiBase}/action`, action);
  }

  public findAndCount(criteria: any) {
    return this.httpClient.post(`${environment.apiBase}/action/findAndCount`, criteria);
  }

  public findById(id: number) {
    return this.httpClient.get(`${environment.apiBase}/action/${id}`);
  }
}
