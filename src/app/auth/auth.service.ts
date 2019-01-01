import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn:boolean = false;
  accessToken: String = null;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private storage: Storage) { 
    storage.get('access_token').then((access_token) => {
      console.log('token: ', access_token);
      this.accessToken = access_token
    });
  }

  login(): Observable<boolean> {
    console.log(this.storage)
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}