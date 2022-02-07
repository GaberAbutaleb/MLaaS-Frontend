import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { CanActivate, Router, ActivatedRoute, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtectUrlService implements CanActivate {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tokenstorageservice: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('router URL', state.url);
    let canShow = false;
    const currentUrl = state.url;

    switch (currentUrl) {
      case '/homepage': {
        // console.log('you are here');
        canShow = this.tokenstorageservice.display('ROLE_ShowDashBoard');
        break;
      }
      case '/CaseSearch': {
        // console.log('you are here');
          canShow = this.tokenstorageservice.display('ROLE_ShowCase');
        break;
      }
      case '/Swift': {
        // console.log('you are here');
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift');
        break;
      }
      case '/Swift/SwiftSettings': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_Settings');
        break;
      }
      case '/Swift/SwiftMTConfigs': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_MTConfigs');
        break;
      }
      case '/Swift/SwiftField70': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_Field70');
        break;
      }
      case '/Swift/SwiftRuels': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_SwiftRules');
        break;
      }
      case '/Swift/MessageArchiveSearch': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_MessageArchiveSearch');
        break;
      }
      case '/Swift/swiftmonitor': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_SwiftMonitor');
        break;
      }
      case '/Swift/swiftmonitor/inerror': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_SwiftMonitor_InError');
        break;
      }
      case '/Swift/swiftmonitor/inpending': {
          canShow = this.tokenstorageservice.display('ROLE_ShowSwift_SwiftMonitor_InPending');
        break;
      }
      case '/ach': {
          canShow = this.tokenstorageservice.display('ROLE_ShowAch');
        break;
      }
      case '/ach/settings': {
        canShow = this.tokenstorageservice.display('ROLE_ShowAch_Settings');
      break;
    }
      case '/ach/purp': {
          canShow = this.tokenstorageservice.display('ROLE_ShowAch_Purp');
        break;
      }
      case '/ach/rmtinf': {
          canShow = this.tokenstorageservice.display('ROLE_ShowAch_Rmtinf');
        break;
      }
      case '/core': {
          canShow = this.tokenstorageservice.display('ROLE_ShowCore');
        break;
      }
      case '/core/settings': {
          canShow = this.tokenstorageservice.display('ROLE_ShowCore_Settings');
        break;
      }
      case '/bankcustomers': {
          canShow = this.tokenstorageservice.display('ROLE_ShowBankCustomers');
        break;
      }
      case '/bankcustomers/settings': {
          canShow = this.tokenstorageservice.display('ROLE_ShowBankCustomers_Settings');
        break;
      }
      case '/listsmanagement': {
          canShow = this.tokenstorageservice.display('ROLE_ShowListsManagement');
        break;
      }
      case '/listsmanagement/settings': {
          canShow = this.tokenstorageservice.display('ROLE_ShowListsManagement_Settings');
        break;
      }
      case '/watchlistsearch': {
          canShow = this.tokenstorageservice.display('ROLE_ShowWatchListSearch');
        break;
      }
      case '/watchlistsearch/watchlist': {
          canShow = this.tokenstorageservice.display('ROLE_ShowWatchListSearch_WatchList');
        break;
      }
      case '/watchlistsearch/whitelist': {
          canShow = this.tokenstorageservice.display('ROLE_ShowWatchListSearch_WhiteList');
        break;
      }
      case '/watchlistsearch/legallist': {
          canShow = this.tokenstorageservice.display('ROLE_ShowWatchListSearch_LegalList');
        break;
      }
      case '/watchlistsearch/settings': {
          canShow = this.tokenstorageservice.display('ROLE_ShowWatchListSearch_Settings');
        break;
      }
      case '/bulksearch': {
          canShow = this.tokenstorageservice.display('ROLE_ShowBulkSearch');
        break;
      }
      case '/bulksearch/search': {
          canShow = this.tokenstorageservice.display('ROLE_ShowBulkSearch_Search');
        break;
      }
      case '/bulksearch/settings': {
          canShow = this.tokenstorageservice.display('ROLE_ShowBulkSearch_Search_Setting');
        break;
      }
      case '/orgkeywords': {
          canShow = this.tokenstorageservice.display('ROLE_ShowNaturalKeywords');
        break;
      }
      case '/orgkeywords/settings': {
          canShow = this.tokenstorageservice.display('ROLE_ShowNaturalKeywords_Settings');
        break;
      }
      default: {
          canShow = false;
        break;
      }
    }
  if (! canShow ) {
    this.router.navigate(['/noaccess']);
  }

    return canShow;
  }

  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   console.log('routerchild', state.url);
  // }
  // canActivate() {


  //    console.log('router URL', this.activatedRoute.snapshot.url[0].path);
  //   return true;
  // }
}
