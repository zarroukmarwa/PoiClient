import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TownService {

  constructor(private httpClient: HttpClient) { }

  public findContainingText(value: string) {
    return this.httpClient.get(`${environment.apiBase}/town?value=${value}`);
  }
}
