import { Action, createReducer, on } from '@ngrx/store';
import { User } from './../models/user.model';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User | any,
  isAuthenticated: boolean
}

export const initialUserState: UsersState = {
  user: null,
  isAuthenticated: false
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

const usersReducer = createReducer(
  // Action will be trigger by facade => notify to effect, effect will call which action to update back to store, check Diagram for detail
  initialUserState,
  on(UsersActions.buildUserSession, (state) => ({...state})),
  on(UsersActions.buildUserSessionSuccess, (state, action) => ({...state, user: action.user, isAuthenticated: true})),
  on(UsersActions.buildUserSessionFailure, (state, action) => ({...state, user: null, isAuthenticated: false}))
)


export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
