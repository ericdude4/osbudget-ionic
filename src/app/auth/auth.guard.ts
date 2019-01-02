import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.isLoggedIn().then((loggedIn) => {
        console.log("The result is", loggedIn)
        if (!loggedIn) {
          // Store the attempted URL for redirecting
          this.authService.redirectUrl = url;

          // Navigate to the login page with extras
          this.router.navigate(['/login']);
        }
        resolve(loggedIn)
      }).catch((err) => {
        console.error(err)
        reject()
      })
    })
    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // // Navigate to the login page with extras
    // this.router.navigate(['/login']);
    // return false;
  }
}