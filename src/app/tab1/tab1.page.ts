import { Component } from '@angular/core';

import { DocumentCollection } from 'ngx-jsonapi';
import { User, UserService } from '../models/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public users: DocumentCollection<User>;

  public constructor(private usersService: UserService) {
    usersService
      .all()
      .subscribe(users => (this.users = users));
  }
}
