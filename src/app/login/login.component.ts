import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../Services/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../Services/auth.service';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;
   response: any;
   roles: string[] = [];
  ngOnInit() {
  }
  constructor(
    private router: Router, public route: ActivatedRoute,
    private authService: AuthService, public toastr: ToastrService, private tokenStorage: TokenStorageService) { }

  signIn(credentials :any) {
    console.log('credentials', credentials);

    this.authService.login(credentials)
      .subscribe((result :any) => {
        this.toastr.success('Login Done successfully', 'Done', { timeOut: 2000 });
        this.response = result;
        console.log('this.response:',this.response.result.access_token)
        const token = this.response.result.access_token;
        this.tokenStorage.saveToken(token);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        console.log('decodedToken',decodedToken)
        this.tokenStorage.saveUsername(decodedToken.username);
        
        
        //  this.tokenStorage.saveAuthorities(decodedToken.roles);
         this.roles = this.tokenStorage.getAuthorities();
        //  console.log('decodedToken', decodedToken);
        if (result) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/homepage']);
        } else {
          this.invalidLogin = true;
        }
      }, (error :any) => {
        this.toastr.error(error.error.message, 'Error', { timeOut: 4000 });
      console.log(error.error.message);
      }
      );
  }



}
