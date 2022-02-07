import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  // signOut() {
  //   localStorage.clear();
  // }

  public display(roleName: any): boolean {
    let canshow = false;
    console.log('display');
    this.roles = this.getAuthorities();
    for (let index = 0; index < this.roles.length; index++) {
      const element = this.roles[index];

      if (this.roles[index] === roleName) {
         canshow = true;
         break;
      }
      // console.log('this.roles', element);
    }

    return canshow;
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): any {
    return localStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    const helper = new JwtHelperService();
     const decodedToken = helper.decodeToken(this.getToken());
      const authorities =  JSON.stringify(decodedToken.roles);
    //  this.tokenStorage.saveAuthorities(decodedToken.roles);
    console.log('authorities',authorities)
    if (localStorage.getItem(TOKEN_KEY)) {
      Object.keys(authorities).forEach((authority :any) => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
