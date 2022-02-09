import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, public route: ActivatedRoute,
    private authService: AuthService, public toastr: ToastrService) { }

  ngOnInit(): void {
  }
  signUp(credentials:any) {
    console.log('credentials', credentials);
    this.authService.signup(credentials)
      .subscribe( (result :any) => {
        this.toastr.success('SignUp Done successfully', 'Done', { timeOut: 2000 });
        //  console.log('decodedToken', decodedToken);
          this.router.navigate(['/homepage']);
        
      }, (error :any) => {
        this.toastr.error(error.error.message, 'Error', { timeOut: 4000 });
      console.log(error.error.message);
      }
      );
  }


}
