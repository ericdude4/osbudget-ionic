import { Injectable } from '@angular/core';
import { Autoregister, Service, Resource } from 'ngx-jsonapi';

export class User extends Resource {
  public attributes = {
    email: 'default email'
  };
}

@Injectable({
  providedIn: 'root',
})
@Autoregister()
export class UserService extends Service<User> {
    public resource = User;
    public type = 'users';
}
