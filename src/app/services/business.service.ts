import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpClient: HttpClient) { }

  public nearbySearch(latitude, longitude, type) {
    return this.httpClient.get(`${environment.apiBase}/business?latitude=${latitude}&longitude=${longitude}&type=${type}`);
  }
}
