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

  private tokenLoaded: boolean = false;

  constructor(private storage: Storage, private http: HttpClient) {
    storage.get('access_token').then((access_token) => {
      this.accessToken = access_token
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (typeof this.accessToken == 'undefined') {
        this.storage.get('access_token').then((token) => {
          // TODO: check the JWT to see if expired
          console.log('the token is ' + token)
          resolve(true)
        })
      } else if (this.accessToken != null) {
        resolve(true)
      } else {
        console.log('no token stored')
        reject()
      }
    })

  }

  login(params: object): Promise<string> {
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