import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ServerandPort = environment.ServerandPort;
  constructor(public http: HttpClient) { }
  isLoggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) { return false; }
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
  login(credentials: any) {
    return this.http.post(this.ServerandPort + '/login', credentials);
  }
}
