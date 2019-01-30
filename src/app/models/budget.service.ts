import { Injectable } from '@angular/core';
import { Autoregister, Service, Resource, DocumentCollection } from 'ngx-jsonapi';
import { User } from './user.service';

export class Budget extends Resource {
  public attributes = {
    name: 'unnamed budget'
  };
  public relationships = {
      users: new DocumentCollection<User>()
  };
}

@Injectable({
  providedIn: 'root',
})
@Autoregister()
export class BudgetService extends Service<Budget> {
    public resource = Budget;
    public type = 'budgets';
}
