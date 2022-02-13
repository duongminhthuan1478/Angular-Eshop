import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as UsersActions from './users.actions';
import * as UsersSelector from './users.selectors';


@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  currentUser$ = this.store.pipe(select(UsersSelector.getUser));
  isAuthenticated$ = this.store.pipe(select(UsersSelector.getUserIsAuth));

  constructor(private store: Store) {}

  buildUserSession() {
    // Sau khi dispatch, action sẽ thông báo cho effect để làm gì đó.
    // After dispatch, the adction will notify to effect to do something
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
