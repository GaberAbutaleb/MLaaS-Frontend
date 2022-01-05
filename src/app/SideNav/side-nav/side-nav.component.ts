import { HttpClient } from '@angular/common/http';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent implements OnDestroy {


  // logOff: any =  this.logout();
  //  this.logout();  'http://192.168.1.231/SASEntCaseManagement/Logoff'
  mobileQuery: MediaQueryList;
  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,

   public  http: HttpClient,
    public toastr: ToastrService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

 logout() {
    // this.authService.logout();
    // let logouturl: any = '';
    localStorage.removeItem('token');
    localStorage.removeItem('AuthUsername');

    //   this.http.get('app/properties/appproperties.json', {responseType: 'text' as 'json'}).subscribe(
    //   result => {
    //     logouturl = JSON.parse(result.toString()).sasLogOut;
    //     // this.toastr.success('Log out Done successfully', 'Done', { timeOut: 2000 });
    //     console.log('result', logouturl);
    //   }, error => {
    //     console.log(error);

    //   }
    // );
    // return logouturl ;
  }

}
