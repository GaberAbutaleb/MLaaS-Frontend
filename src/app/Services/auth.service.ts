import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ServerandPort = environment.ServerandPort;
  constructor(public http: HttpClient , public toastr: ToastrService, public router: Router) { }
  isLoggedIn() {
    // console.log('is logged in');
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
  signup(credentials: any) {
    return this.http.post(this.ServerandPort + '/signup', credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('AuthUsername');
    this.router.navigate(['/login']);
    // this.logoutURL().subscribe(
    //   result => {
    //     this.toastr.success('Log out Done successfully', 'Done', { timeOut: 2000 });
    //     console.log('result', result);
    //     logouturl = result;
    //   }, error => {
    //     console.log(error);

    //   }
    // );
    //  window.location.href = 'http://192.168.1.231/SASEntCaseManagement/Logoff';
    //  this.router.navigate(['/login']);
    // localStorage.removeItem('token');
  }


}
