import { Component } from '@angular/core';

import { DocumentCollection } from 'ngx-jsonapi';
import { User, UserService } from '../models/user.service';
import { BudgetService, Budget } from '../models/budget.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public users: DocumentCollection<User>;
  public budgets: DocumentCollection<Budget>;

  public constructor(private usersService: UserService, private budgetsService: BudgetService) {
    this.usersService
      .all()
      .subscribe(users => {
        this.users = users
      });

    this.budgetsService
      .all()
      .subscribe(budgets => {
        this.budgets = budgets
      });
  }
}
