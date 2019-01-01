import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;
  email: string = 'eric@clockk.com';
  password: string = 'Testing123';

  constructor(public authService: AuthService, public router: Router) {
  }

  login() {
    console.log(this.email)

    this.authService.login({email: this.email, password: this.password}).then((accessToken) => {
      console.log(this.authService)
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/tabs';

        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}