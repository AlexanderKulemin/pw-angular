import { Injectable } from '@angular/core';
import { Login, SignUp, UserInfo } from "../models";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  logIn(body: Login) {
    return this.http.post(`${this.baseUrl}/sessions/create`, body)
  }

  signUp(body: SignUp) {
    return this.http.post(`${this.baseUrl}/users`, body);
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getUserInfo() {
    return this.http.get<UserInfo>(`${this.baseUrl}/api/protected/user-info`);
  }
}
