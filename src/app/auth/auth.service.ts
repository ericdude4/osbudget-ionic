import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: string;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private storage: Storage, private http: HttpClient) { 
    storage.get('access_token').then((access_token) => {
      console.log('token: ', access_token);
      this.accessToken = access_token
    });
  }

  isLoggedIn(): boolean {
    // TODO: check the JWT to see if expired
    if (this.accessToken) return true;
    return false;
  }

  login(params: object): Promise<string> {
    console.log(params)
    
    // return of(true).pipe(
    //   delay(1000),
    //   tap(val => this.isLoggedIn = true)
    // );
    return new Promise<string>((resolve, reject) => {
      this.http.post('http://localhost:4000/auth/token', params).subscribe((data: any) => {
        this.accessToken = data.access_token;
        this.storage.set('access_token', this.accessToken)
        resolve(this.accessToken)
      })
    })
  }

  logout(): void {
    this.accessToken = null;
    this.storage.set('access_token', null)
  }
}