import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '@thuan-fe-apps-workspace/users';
import { catchError, concatMap, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as UsersActions from './users.actions';


@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      // Sau khi effect trả về an action/observable, reducer sẽ trigger chính action nào được trả về và thực hiện udpate store.
      const token = this._auth.isValidToken();
      if(token) {
        const userId = this._auth.getUserIdFromToken();
        if(userId) {
          return this._users.getUserById(userId).pipe(
            map((res) => {
              return UsersActions.buildUserSessionSuccess({user: res.data});
            }),
            catchError(() => of(UsersActions.buildUserSessionFailure()))
          )
        } else {
          return of(UsersActions.buildUserSessionFailure());
        }
      } else {
        return of(UsersActions.buildUserSessionFailure());
      }
    })
    )
  )

  constructor(private readonly actions$: Actions, private _auth: AuthService, private _users: UsersService) {}
}
