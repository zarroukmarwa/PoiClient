import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import User from '../entities/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string = "";
  public user: User | null = null;
  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(login: string, password: string) {
    this.httpClient.post(`${environment.apiBase}/user/login`, { login, password }).subscribe((response: any) => {
      this.setToken(response.data.token);
      this.user = response.data.user;
      this.router.navigate(["/"]);
    });
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  public getToken(): string {
    return this.token || localStorage.getItem("token");
  }

  public logout() {
    this.setToken("");
    this.user = null;
    this.httpClient.delete(`${environment.apiBase}/user/logout`).subscribe((response: any) => console.log("Logged out"));
  }

  public loadCurrentUser() {
    this.httpClient.get(`${environment.apiBase}/user/getLoggedUser`).subscribe((response: any) => {
      this.user = response.data;
    });
  }
  public findAll() {
    return this.httpClient.get(`${environment.apiBase}/user`);
  }
}
